const Test = require('../models/testModel');
const User = require('../models/userModel');

/**
 * @desc    Get all available tests (titles only)
 * @route   GET /api/tests
 * @access  Private
 */
const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({}).select('_id title');
    res.json(tests);
  } catch (error) {
    console.error('GET_ALL_TESTS_ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get a single test by ID with its questions
 * @route   GET /api/tests/:id
 * @access  Private
 */
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const questionsForStudent = test.questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
    }));
    res.json({ _id: test._id, title: test.title, questions: questionsForStudent });
  } catch (error) {
    console.error('GET_TEST_BY_ID_ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Submit answers for a test and get the score
 * @route   POST /api/tests/submit
 * @access  Private
 */
const submitTest = async (req, res) => {
  const { testId, answers } = req.body;
  const userId = req.user._id;
  try {
    const test = await Test.findById(testId).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    let score = 0;
    test.questions.forEach(correctQuestion => {
      const userAnswer = answers.find(
        ans => ans.questionId.toString() === correctQuestion._id.toString()
      );
      if (userAnswer && userAnswer.selectedAnswer === correctQuestion.correctAnswer) {
        score++;
      }
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        scores: { testId: test._id, testTitle: test.title, score: score, date: new Date() },
      },
    });
    res.json({
      message: 'Test submitted successfully!',
      testId: testId,
      score: score,
      totalQuestions: test.questions.length,
    });
  } catch (error) {
    console.error('SUBMIT_TEST_ERROR:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get the leaderboard
 * @route   GET /api/tests/leaderboard
 * @access  Private
 */
const getLeaderboard = async (req, res) => {
  console.log("--- 1. ENTERING getLeaderboard function ---");
  try {
    const users = await User.find({});
    console.log(`--- 2. Found ${users.length} users in the database ---`);

    const leaderboardData = users
      .map(user => {
        let totalScore = 0;
        if (user && user.scores && Array.isArray(user.scores)) {
          totalScore = user.scores.reduce((acc, current) => acc + (current.score || 0), 0);
        }
        return {
          name: user.name,
          totalScore: totalScore,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);
      
    console.log("--- 3. Calculation and sort complete. Sending response... ---");
    res.json(leaderboardData);

  } catch (error) {
    console.error('--- 4. LEADERBOARD FUNCTION FAILED ---');
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllTests,
  getTestById,
  submitTest,
  getLeaderboard,
};