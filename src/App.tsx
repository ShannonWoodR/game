import React, { useState } from 'react';
import { Users, Trophy, ArrowRight, RotateCcw, Eye, EyeOff, Plus, Trash2, Edit3, Save, CreditCard, Gamepad2 } from 'lucide-react';

type GameState = 'setup' | 'player1-select' | 'player2-select' | 'reveal' | 'finished';
type Tab = 'game' | 'cards';

interface GameData {
  prompts: string[];
  answers: string[];
  player1Cards: string[];
  player2Cards: string[];
  currentPrompt: string;
  player1Answer: string;
  player2Answer: string;
  round: number;
}

const defaultPrompts = [
  "What I would do if I could time travel but only to embarrassing moments in history",
  "The most ridiculous conspiracy theory I secretly believe",
  "What my search history says about my mental state",
  "The weirdest thing I've done to avoid small talk",
  "My most embarrassing autocorrect fail",
  "What I would name my autobiography",
  "The strangest thing I've convinced myself is normal",
  "My most irrational fear that I'll never admit",
  "What I think happens in the 5 seconds before I fall asleep",
  "The most creative excuse I've used to get out of plans"
];

const defaultAnswers = [
  "Pretending to understand wine while drinking box wine",
  "Googling 'how to adult' at age 30",
  "Talking to my plants like they're therapists",
  "Using a calculator for 2+2",
  "Practicing acceptance speeches in the shower",
  "Crying during dog food commercials",
  "Wearing pajamas to 'quick' grocery runs",
  "Pretending my phone died to avoid conversations",
  "Eating cereal for dinner and calling it 'breakfast for dinner'",
  "Googling myself to see if I'm famous yet",
  "Waving back at someone who wasn't waving at me",
  "Getting genuinely excited about new sponges",
  "Talking to myself in different accents",
  "Pretending to be busy when someone walks by my office",
  "Using 'reply all' when I meant to reply to one person",
  "Singing the wrong lyrics confidently for years",
  "Trying to look cool while walking into a glass door",
  "Explaining memes to my parents",
  "Getting lost in my own neighborhood",
  "Pretending to understand cryptocurrency"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('game');
  const [gameState, setGameState] = useState<GameState>('setup');
  const [hideCards, setHideCards] = useState(false);
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [answers, setAnswers] = useState(defaultAnswers);
  const [newPrompt, setNewPrompt] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingPrompt, setEditingPrompt] = useState<number | null>(null);
  const [editingAnswer, setEditingAnswer] = useState<number | null>(null);
  
  const [gameData, setGameData] = useState<GameData>({
    prompts: [],
    answers: [],
    player1Cards: [],
    player2Cards: [],
    currentPrompt: '',
    player1Answer: '',
    player2Answer: '',
    round: 1,
  });

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewGame = () => {
    if (answers.length < 16) {
      alert('You need at least 16 answer cards to play a full game. Add more cards in the "My Cards" tab.');
      return;
    }

    const shuffledAnswers = shuffleArray(answers);
    const shuffledPrompts = shuffleArray(prompts);
    
    setGameData({
      prompts: shuffledPrompts,
      answers: shuffledAnswers,
      player1Cards: shuffledAnswers.slice(0, 8),
      player2Cards: shuffledAnswers.slice(8, 16),
      currentPrompt: shuffledPrompts[0],
      player1Answer: '',
      player2Answer: '',
      round: 1,
    });
    
    setGameState('player1-select');
  };

  const selectAnswer = (answer: string) => {
    if (gameState === 'player1-select') {
      setGameData(prev => ({ ...prev, player1Answer: answer }));
    } else if (gameState === 'player2-select') {
      setGameData(prev => ({ ...prev, player2Answer: answer }));
    }
  };

  const confirmSelection = () => {
    if (gameState === 'player1-select') {
      setGameState('player2-select');
    } else if (gameState === 'player2-select') {
      setGameState('reveal');
    }
  };

  const nextRound = () => {
    if (gameData.round >= 8) {
      setGameState('finished');
      return;
    }

    const newPlayer1Cards = gameData.player1Cards.filter(card => card !== gameData.player1Answer);
    const newPlayer2Cards = gameData.player2Cards.filter(card => card !== gameData.player2Answer);

    setGameData(prev => ({
      ...prev,
      player1Cards: newPlayer1Cards,
      player2Cards: newPlayer2Cards,
      currentPrompt: prev.prompts[prev.round],
      player1Answer: '',
      player2Answer: '',
      round: prev.round + 1,
    }));

    setGameState('player1-select');
  };

  const addPrompt = () => {
    if (newPrompt.trim()) {
      setPrompts([...prompts, newPrompt.trim()]);
      setNewPrompt('');
    }
  };

  const addAnswer = () => {
    if (newAnswer.trim()) {
      setAnswers([...answers, newAnswer.trim()]);
      setNewAnswer('');
    }
  };

  const deletePrompt = (index: number) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      setPrompts(prompts.filter((_, i) => i !== index));
    }
  };

  const deleteAnswer = (index: number) => {
    if (confirm('Are you sure you want to delete this answer?')) {
      setAnswers(answers.filter((_, i) => i !== index));
    }
  };

  const getCurrentCards = () => {
    if (gameState === 'player1-select') return gameData.player1Cards;
    if (gameState === 'player2-select') return gameData.player2Cards;
    return [];
  };

  const getCurrentPlayer = () => {
    if (gameState === 'player1-select') return 'Player 1';
    if (gameState === 'player2-select') return 'Player 2';
    return '';
  };

  const getSelectedAnswer = () => {
    if (gameState === 'player1-select') return gameData.player1Answer;
    if (gameState === 'player2-select') return gameData.player2Answer;
    return '';
  };

  if (activeTab === 'cards') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div className="gradient-bg" style={{ padding: '50px 20px 24px', color: 'white' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>The Harbinger of Humor</h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>Add your own prompts and answers to make the game more fun!</p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <button
            onClick={() => setActiveTab('game')}
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Gamepad2 size={20} />
            Game
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: 'transparent',
              color: '#6366f1',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderBottom: '2px solid #6366f1'
            }}
          >
            <CreditCard size={20} />
            My Cards
          </button>
        </div>

        <div style={{ padding: '20px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          {/* Prompts Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Prompt Cards ({prompts.length})
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              These are the questions or scenarios that will be shown to both players
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <textarea
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Add a new prompt..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  minHeight: '48px',
                  resize: 'vertical'
                }}
              />
              <button
                onClick={addPrompt}
                disabled={!newPrompt.trim()}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: newPrompt.trim() ? '#6366f1' : '#9ca3af',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={20} color="white" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {prompts.map((prompt, index) => (
                <div key={index} className="card-shadow" style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  {editingPrompt === index ? (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                      <textarea
                        value={prompt}
                        onChange={(e) => {
                          const updatedPrompts = [...prompts];
                          updatedPrompts[index] = e.target.value;
                          setPrompts(updatedPrompts);
                        }}
                        style={{
                          flex: 1,
                          fontSize: '16px',
                          border: 'none',
                          borderBottom: '1px solid #6366f1',
                          paddingBottom: '4px',
                          resize: 'vertical'
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingPrompt(null)}
                        style={{ padding: '8px', backgroundColor: 'transparent' }}
                      >
                        <Save size={16} color="#10b981" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: '16px', marginBottom: '12px', lineHeight: '22px' }}>{prompt}</p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => setEditingPrompt(index)}
                          style={{ padding: '8px', backgroundColor: 'transparent' }}
                        >
                          <Edit3 size={16} color="#6366f1" />
                        </button>
                        <button
                          onClick={() => deletePrompt(index)}
                          style={{ padding: '8px', backgroundColor: 'transparent' }}
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Answers Section */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Answer Cards ({answers.length})
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              These are the possible answers that players can choose from. You need at least 16 for a full game.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Add a new answer..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  minHeight: '48px',
                  resize: 'vertical'
                }}
              />
              <button
                onClick={addAnswer}
                disabled={!newAnswer.trim()}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: newAnswer.trim() ? '#6366f1' : '#9ca3af',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={20} color="white" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {answers.map((answer, index) => (
                <div key={index} className="card-shadow" style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  {editingAnswer === index ? (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                      <textarea
                        value={answer}
                        onChange={(e) => {
                          const updatedAnswers = [...answers];
                          updatedAnswers[index] = e.target.value;
                          setAnswers(updatedAnswers);
                        }}
                        style={{
                          flex: 1,
                          fontSize: '16px',
                          border: 'none',
                          borderBottom: '1px solid #6366f1',
                          paddingBottom: '4px',
                          resize: 'vertical'
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingAnswer(null)}
                        style={{ padding: '8px', backgroundColor: 'transparent' }}
                      >
                        <Save size={16} color="#10b981" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: '16px', marginBottom: '12px', lineHeight: '22px' }}>{answer}</p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => setEditingAnswer(index)}
                          style={{ padding: '8px', backgroundColor: 'transparent' }}
                        >
                          <Edit3 size={16} color="#6366f1" />
                        </button>
                        <button
                          onClick={() => deleteAnswer(index)}
                          style={{ padding: '8px', backgroundColor: 'transparent' }}
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Tab Content
  if (gameState === 'setup') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div className="gradient-bg" style={{ padding: '50px 20px 32px', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>The Harbinger of Humor</h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>A hilarious card game for couples</p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <button
            onClick={() => setActiveTab('game')}
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: 'transparent',
              color: '#6366f1',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderBottom: '2px solid #6366f1'
            }}
          >
            <Gamepad2 size={20} />
            Game
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <CreditCard size={20} />
            My Cards
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Game Info */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={24} color="#6366f1" />
              <span style={{ fontSize: '16px', fontWeight: '600' }}>2 Players</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={24} color="#10b981" />
              <span style={{ fontSize: '16px', fontWeight: '600' }}>8 Rounds</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="card-shadow-lg" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '32px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>How to Play:</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '24px' }}>
              1. Each player gets 8 answer cards<br/>
              2. A prompt card is shown to both players<br/>
              3. Select your funniest answer for the prompt<br/>
              4. Reveal answers and laugh together<br/>
              5. Continue for 8 rounds of hilarity!
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={startNewGame}
            className="gradient-button"
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px'
            }}
          >
            Start New Game
            <ArrowRight size={20} />
          </button>

          {/* Card Counts */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
              {prompts.length} Prompt Cards • {answers.length} Answer Cards
            </p>
            {answers.length < 16 && (
              <p style={{ fontSize: '12px', color: '#ef4444' }}>
                ⚠️ Add more answer cards in "My Cards" tab for a full game
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Game screens (player selection, reveal, finished)
  if (gameState === 'player1-select' || gameState === 'player2-select') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="gradient-bg" style={{ padding: '50px 20px 24px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700' }}>The Harbinger of Humor</h1>
            <button
              onClick={() => setHideCards(!hideCards)}
              style={{
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }}
            >
              {hideCards ? <Eye size={20} color="white" /> : <EyeOff size={20} color="white" />}
            </button>
          </div>
          <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Round {gameData.round} of 8</p>
          <p style={{ fontSize: '18px', fontWeight: '600' }}>{getCurrentPlayer()}'s Turn</p>
        </div>

        {/* Prompt */}
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Prompt Card</p>
          <div className="card-shadow-lg" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid #6366f1'
          }}>
            <p style={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', lineHeight: '26px' }}>
              {gameData.currentPrompt}
            </p>
          </div>
        </div>

        {/* Answer Cards */}
        <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            Your Answer Cards ({getCurrentCards().length} remaining)
          </p>
          
          {hideCards ? (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              borderRadius: '16px',
              margin: '20px 0'
            }}>
              <EyeOff size={48} color="#9ca3af" />
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#6b7280', marginTop: '12px' }}>Cards Hidden</p>
              <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', marginTop: '8px', padding: '0 40px' }}>
                Tap the eye icon to show cards when it's your turn
              </p>
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
              {getCurrentCards().map((answer, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(answer)}
                  className="card-shadow"
                  style={{
                    width: '100%',
                    backgroundColor: getSelectedAnswer() === answer ? '#ecfdf5' : 'white',
                    border: `2px solid ${getSelectedAnswer() === answer ? '#10b981' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '12px',
                    textAlign: 'left'
                  }}
                >
                  <p style={{
                    fontSize: '16px',
                    color: getSelectedAnswer() === answer ? '#065f46' : '#374151',
                    fontWeight: getSelectedAnswer() === answer ? '600' : 'normal',
                    lineHeight: '22px'
                  }}>
                    {answer}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Button */}
        {getSelectedAnswer() && !hideCards && (
          <div style={{ padding: '20px' }}>
            <button
              onClick={confirmSelection}
              style={{
                width: '100%',
                backgroundColor: '#10b981',
                borderRadius: '12px',
                padding: '16px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {gameState === 'player1-select' ? 'Pass to Player 2' : 'Reveal Answers'}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'reveal') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="gradient-bg" style={{ padding: '50px 20px 24px', color: 'white' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700' }}>The Harbinger of Humor</h1>
          <p style={{ fontSize: '18px', fontWeight: '600' }}>Round {gameData.round} Results</p>
        </div>

        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
          {/* Prompt */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Prompt</p>
            <div className="card-shadow-lg" style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              border: '2px solid #6366f1'
            }}>
              <p style={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', lineHeight: '26px' }}>
                {gameData.currentPrompt}
              </p>
            </div>
          </div>

          {/* Answers */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Player 1's Answer</p>
              <div className="card-shadow" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: '2px solid #10b981'
              }}>
                <p style={{ fontSize: '16px', color: '#065f46', lineHeight: '22px', textAlign: 'center' }}>
                  {gameData.player1Answer}
                </p>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Player 2's Answer</p>
              <div className="card-shadow" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: '2px solid #10b981'
              }}>
                <p style={{ fontSize: '16px', color: '#065f46', lineHeight: '22px', textAlign: 'center' }}>
                  {gameData.player2Answer}
                </p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div style={{ padding: '20px 0' }}>
            <button
              onClick={nextRound}
              style={{
                width: '100%',
                backgroundColor: '#6366f1',
                borderRadius: '12px',
                padding: '16px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {gameData.round >= 8 ? 'Finish Game' : 'Next Round'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div className="gradient-bg" style={{ padding: '50px 20px 32px', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Game Complete!</h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>Thanks for playing The Harbinger of Humor</p>
        </div>

        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <Trophy size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
              You've completed all 8 rounds!
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '24px', padding: '0 20px' }}>
              Hope you had some great laughs together. Ready for another round of hilarity?
            </p>
          </div>

          <button
            onClick={() => setGameState('setup')}
            className="gradient-button"
            style={{
              padding: '16px 24px',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <RotateCcw size={20} />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}