import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shuffle, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  ArrowRight,
  Users,
  Trophy
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type GameState = 'setup' | 'player1-select' | 'player2-select' | 'reveal' | 'finished';

interface GameData {
  prompts: string[];
  answers: string[];
  player1Cards: string[];
  player2Cards: string[];
  currentPrompt: string;
  player1Answer: string;
  player2Answer: string;
  round: number;
  player1Score: number;
  player2Score: number;
}

export default function GameScreen() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [hideCards, setHideCards] = useState(false);
  const [gameData, setGameData] = useState<GameData>({
    prompts: [
      "What I would do if I could time travel but only to embarrassing moments in history",
      "The most ridiculous conspiracy theory I secretly believe",
      "What my search history says about my mental state",
      "The weirdest thing I've done to avoid small talk",
      "My most embarrassing autocorrect fail",
      "What I would name my autobiography",
      "The strangest thing I've convinced myself is normal",
      "My most irrational fear that I'll never admit",
      "What I think happens in the 5 seconds before I fall asleep",
      "The most creative excuse I've used to get out of plans",
      "What my inner monologue sounds like during awkward silences",
      "The weirdest compliment I've ever received",
      "What I would do if I woke up as my pet for a day",
      "My most embarrassing misunderstanding of a common phrase",
      "The strangest thing I've googled at 3 AM",
      "What I think my neighbors assume about me",
      "My most ridiculous childhood fear that I still have",
      "What I would put in a time capsule to confuse future archaeologists",
      "The weirdest thing I've done to procrastinate",
      "What my browser history would reveal about my personality",
      "The most creative lie I've told to get out of doing something",
      "What I think my pet would say about me if they could talk",
      "The weirdest thing I've done when I thought no one was watching",
      "My most embarrassing moment that I still cringe about",
      "What I would do if I had unlimited money but could only spend it on ridiculous things",
      "The strangest habit I've developed as an adult",
      "What I think happens in my brain during a mental blank",
      "The most ridiculous thing I've convinced myself I need",
      "What I would do if I could read minds but only during awkward situations",
      "The weirdest thing I've done to avoid confrontation",
      "My most embarrassing misunderstanding of technology",
      "What I think my reflection thinks about me",
      "The strangest thing I've done to procrastinate on something important",
      "What I would do if I could only communicate through interpretive dance",
      "The most ridiculous thing I've done to impress someone",
      "What I think my future self would say about my current life choices",
      "The weirdest thing I've done when I was home alone",
      "My most embarrassing moment in a public place",
      "What I would do if I could only eat foods that start with the same letter for a week",
      "The strangest thing I've convinced myself is a good idea",
      "What I think my car would say about my driving",
      "The most ridiculous thing I've done to avoid doing chores",
      "What I would do if I could only speak in questions for a day",
      "The weirdest thing I've done to try to look busy",
      "My most embarrassing autocorrect or voice-to-text fail",
      "What I think my phone knows about me that I don't want it to",
      "The strangest thing I've done to avoid making a phone call",
      "What I would do if I could only travel by unconventional means",
      "The most ridiculous thing I've done to avoid admitting I was wrong",
      "What I think my neighbors really think about me",
      "The weirdest thing I've done when I couldn't sleep",
      "My most embarrassing moment involving food",
      "What I would do if I could only wear clothes from one decade for the rest of my life",
      "The strangest thing I've done to try to be healthy",
      "What I think my browser history says about my personality",
      "The most ridiculous thing I've done to avoid exercise",
      "What I would do if I could only communicate through movie quotes",
      "The weirdest thing I've done to try to save money",
      "My most embarrassing moment involving technology",
      "What I think my past self would think about my current life",
      "The strangest thing I've done when I was bored",
      "What I would do if I could only eat foods that rhyme for a month",
      "The most ridiculous thing I've done to avoid social interaction",
      "What I think my future self will be embarrassed about regarding my current habits",
      "The weirdest thing I've done to try to look smart",
      "My most embarrassing moment involving a misunderstanding",
      "What I would do if I could only use transportation methods from the 1800s",
      "The strangest thing I've done to avoid making a decision",
      "What I think my reflection would say if it could talk back",
      "The most ridiculous thing I've done to try to be trendy",
      "What I would do if I could only speak in rhymes for a week",
      "The weirdest thing I've done when I thought I was being watched",
      "My most embarrassing moment that involved a complete stranger",
      "What I think my pet would post on social media about me",
      "The strangest thing I've done to avoid being late",
      "What I would do if I could only eat foods that are the same color for a day",
      "The most ridiculous thing I've done to avoid admitting I don't understand something",
      "What I think my car's GPS really thinks about my navigation skills",
      "The weirdest thing I've done to try to fall asleep",
      "My most embarrassing moment involving a complete misreading of a situation",
      "What I would do if I could only communicate through gestures and facial expressions",
      "The strangest thing I've done when I was trying to be helpful",
      "What I think my phone's autocorrect is trying to tell me about myself",
      "The most ridiculous thing I've done to avoid doing something I don't want to do",
      "What I would do if I could only travel to places that start with the same letter as my name",
      "The weirdest thing I've done to try to remember something important",
      "My most embarrassing moment that I thought no one noticed but everyone did",
      "What I think my future self would want to tell my current self",
      "The strangest thing I've done when I was trying to be environmentally friendly",
      "What I would do if I could only use technology from 20 years ago",
      "The most ridiculous thing I've done to try to avoid a awkward conversation",
      "What I think my subconscious is really up to when I'm not paying attention"
    ],
    answers: [
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
      "Pretending to understand cryptocurrency",
      "Dancing like nobody's watching (but everyone is)",
      "Wearing socks with sandals unironically",
      "Microwaving leftover pizza instead of using the oven",
      "Talking to customer service like they're my best friend",
      "Getting emotional over fictional characters",
      "Pretending to read the terms and conditions",
      "Using voice-to-text in public and having it misunderstand everything",
      "Trying to be the 'fun' parent/aunt/uncle and failing",
      "Getting way too invested in reality TV drama",
      "Explaining why pineapple belongs on pizza",
      "Sniffing books",
      "Collecting rubber ducks",
      "Practicing magic tricks badly",
      "Hoarding condiment packets",
      "Talking to inanimate objects",
      "Wearing mismatched socks intentionally",
      "Making sound effects for everything",
      "Eating pizza with a fork and knife",
      "Singing in the shower loudly",
      "Collecting bottle caps",
      "Wearing sunglasses indoors",
      "Making up words and using them seriously",
      "Eating ice cream for breakfast",
      "Talking to myself in the mirror",
      "Wearing pajamas all day",
      "Making weird faces when concentrating",
      "Eating cereal dry",
      "Collecting random facts about penguins",
      "Wearing clothes inside out",
      "Making up elaborate backstories for strangers",
      "Eating sandwiches deconstructed",
      "Talking in a fake accent",
      "Wearing multiple watches",
      "Making sound effects while walking",
      "Eating soup with a fork",
      "Collecting expired coupons",
      "Wearing winter clothes in summer",
      "Making up dance moves on the spot",
      "Eating pizza backwards",
      "Talking to houseplants",
      "Wearing shoes on the wrong feet",
      "Making weird noises when thinking",
      "Eating spaghetti with a spoon only",
      "Collecting rubber bands",
      "Wearing a cape to the grocery store",
      "Making up songs about mundane activities",
      "Eating burgers with utensils",
      "Talking to my reflection",
      "Wearing multiple hats at once",
      "Making sound effects for my thoughts",
      "Eating tacos with a fork",
      "Collecting twist ties",
      "Wearing formal wear to casual events",
      "Making up conspiracy theories about everyday objects",
      "Eating salad with my hands",
      "Talking to electronics when they don't work",
      "Wearing swimming goggles everywhere",
      "Making weird faces at security cameras",
      "Eating ice cream with chopsticks",
      "Collecting used napkins",
      "Wearing a tuxedo to bed",
      "Making up elaborate excuses for being 2 minutes late",
      "Eating soup with chopsticks",
      "Talking to my car",
      "Wearing flip-flops in snow",
      "Making sound effects for other people's actions",
      "Eating pizza with ranch dressing",
      "Collecting old receipts",
      "Wearing a lab coat to coffee shops",
      "Making up fake allergies to avoid foods I don't like",
      "Eating cereal with orange juice",
      "Talking to street signs",
      "Wearing a helmet while walking",
      "Making weird noises when I'm happy",
      "Eating hot dogs with a knife and fork",
      "Collecting bottle caps from drinks I've never had",
      "Wearing a snorkel in the bathtub",
      "Making up fake names for myself at coffee shops",
      "Eating cookies by separating all the parts first",
      "Talking to my GPS like it's a person",
      "Wearing oven mitts as regular gloves",
      "Making sound effects for my emotions",
      "Eating bananas with a spoon",
      "Collecting rocks that look like other things",
      "Wearing a life jacket on dry land",
      "Making up elaborate stories about why I'm buying weird combinations of items",
      "Eating corn on the cob with a fork",
      "Talking to vending machines",
      "Wearing a scuba mask to read underwater",
      "Making weird faces when no one's looking",
      "Eating apples with a knife and fork",
      "Collecting fortune cookie fortunes",
      "Wearing a hard hat to watch TV",
      "Making up fake accents for different moods",
      "Eating oranges with the peel on",
      "Talking to my shadow",
      "Wearing safety goggles to cut onions",
      "Making sound effects for weather",
      "Eating grapes one at a time with tweezers",
      "Collecting stickers I'll never use",
      "Wearing a wetsuit to take a shower",
      "Making up fake phobias",
      "Eating strawberries with salt",
      "Talking to my food before eating it",
      "Wearing a bicycle helmet in the car",
      "Making weird noises when I stretch",
      "Eating watermelon with a spoon",
      "Collecting business cards from places I've never been",
      "Wearing ski goggles to watch movies",
      "Making up fake superstitions",
      "Eating pineapple on everything",
      "Talking to my laundry",
      "Wearing gardening gloves to type",
      "Making sound effects for my thoughts out loud",
      "Eating cake with a spoon",
      "Collecting expired gift cards",
      "Wearing a raincoat indoors",
      "Making up fake medical conditions",
      "Eating popcorn with chopsticks",
      "Talking to my alarm clock",
      "Wearing snow boots in summer",
      "Making weird faces at babies",
      "Eating sandwiches layer by layer",
      "Collecting empty boxes",
      "Wearing a chef's hat to make cereal",
      "Making up fake languages",
      "Eating soup with a straw",
      "Talking to my keys when I can't find them",
      "Wearing a diving mask to wash dishes",
      "Making sound effects for my pets",
      "Eating pizza with a spoon",
      "Collecting lint",
      "Wearing a space helmet to go outside",
      "Making up fake awards for myself",
      "Eating spaghetti with my hands",
      "Talking to my coffee maker",
      "Wearing a hazmat suit to clean",
      "Making weird noises when I'm concentrating",
      "Eating ice cream with a fork",
      "Collecting broken crayons",
      "Wearing a snorkel to drink water",
      "Making up fake hobbies",
      "Eating salad with a straw",
      "Talking to my toothbrush",
      "Wearing a wetsuit to do laundry",
      "Making sound effects for my memories",
      "Eating cookies with chopsticks",
      "Collecting used tissues",
      "Wearing a diving helmet to take a bath",
      "Making up fake talents",
      "Eating yogurt with a fork",
      "Talking to my pillow",
      "Wearing a space suit to vacuum",
      "Making weird faces in the mirror",
      "Eating cereal with a fork",
      "Collecting empty toilet paper rolls",
      "Wearing a gas mask to cook",
      "Making up fake fears",
      "Eating soup with my hands",
      "Talking to my shoes",
      "Wearing a helmet to sleep",
      "Making sound effects for my dreams",
      "Eating pasta with a straw",
      "Collecting dead batteries",
      "Wearing a life preserver to take a shower",
      "Making up fake achievements",
      "Eating bread with chopsticks",
      "Talking to my doorknob",
      "Wearing a hazmat suit to garden",
      "Making weird noises when I'm thinking",
      "Eating rice with a spoon individually",
      "Collecting broken pencils",
      "Wearing a diving suit to wash the car",
      "Making up fake memories",
      "Eating chips with a fork",
      "Talking to my mailbox",
      "Wearing a space helmet to mow the lawn",
      "Making sound effects for my emotions out loud",
      "Eating nuts with tweezers",
      "Collecting used napkins",
      "Wearing a snorkel to brush my teeth",
      "Making up fake skills",
      "Eating fruit with a knife and fork exclusively",
      "Talking to my thermostat",
      "Wearing a wetsuit to do dishes",
      "Making weird faces when I'm happy",
      "Eating candy with chopsticks",
      "Collecting empty containers",
      "Wearing a diving mask to read",
      "Making up fake accomplishments",
      "Eating everything with a spoon",
      "Talking to my remote control",
      "Wearing a helmet to watch TV",
      "Making sound effects for everything I touch",
      "Eating salad with my hands exclusively",
      "Collecting broken toys",
      "Wearing a space suit to take out the trash",
      "Making up fake expertise",
      "Eating soup with a knife",
      "Talking to my computer mouse",
      "Wearing a snorkel to eat",
      "Making weird noises when I'm excited",
      "Eating everything deconstructed",
      "Collecting used straws",
      "Wearing a diving helmet to drive",
      "Making up fake credentials",
      "Eating with my feet",
      "Talking to my light switches",
      "Wearing a hazmat suit to eat",
      "Making sound effects for my heartbeat",
      "Eating everything with tweezers",
      "Collecting empty bottles",
      "Wearing a space helmet to exercise",
      "Making up fake degrees",
      "Eating everything upside down",
      "Talking to my ceiling fan",
      "Wearing a wetsuit to exercise",
      "Making weird faces when I'm sad",
      "Eating everything with a straw",
      "Collecting broken electronics",
      "Wearing a diving mask to exercise",
      "Making up fake certifications",
      "Eating everything backwards",
      "Talking to my doorbell",
      "Wearing a snorkel to exercise",
      "Making sound effects for my breathing",
      "Eating everything with my eyes closed",
      "Collecting empty tubes",
      "Wearing a space suit to exercise",
      "Making up fake qualifications",
      "Eating everything while standing on one foot",
      "Talking to my smoke detector",
      "Wearing a helmet to exercise",
      "Making weird noises when I'm nervous",
      "Eating everything while hopping",
      "Collecting used bandaids",
      "Wearing a hazmat suit to exercise",
      "Making up fake experience",
      "Eating everything while spinning",
      "Talking to my doormat",
      "Wearing a diving helmet to exercise",
      "Making sound effects for my thoughts constantly",
      "Eating everything while doing jumping jacks",
      "Collecting empty pill bottles",
      "Wearing a space helmet to do yoga",
      "Making up fake references",
      "Eating everything while doing lunges",
      "Talking to my garden hose",
      "Wearing a snorkel to do yoga",
      "Making weird faces when I'm confused",
      "Eating everything while doing squats",
      "Collecting broken umbrellas",
      "Wearing a wetsuit to do yoga",
      "Making up fake testimonials",
      "Eating everything while doing push-ups",
      "Talking to my sprinkler system",
      "Wearing a diving mask to do yoga",
      "Making sound effects for my pulse",
      "Eating everything while doing sit-ups",
      "Collecting empty containers of all sizes",
      "Wearing a helmet to do yoga",
      "Making up fake endorsements",
      "Eating everything while doing planks",
      "Talking to my mailbox post",
      "Wearing a hazmat suit to do yoga",
      "Making weird noises when I'm sleepy",
      "Eating everything while doing burpees",
      "Collecting used cotton swabs",
      "Wearing a space suit to meditate",
      "Making up fake reviews",
      "Eating everything while doing mountain climbers",
      "Talking to my driveway",
      "Wearing a snorkel to meditate",
      "Making sound effects for my digestion",
      "Eating everything while doing jumping rope",
      "Collecting empty tape dispensers",
      "Wearing a wetsuit to meditate",
      "Making up fake ratings",
      "Eating everything while doing high knees",
      "Talking to my sidewalk",
      "Wearing a diving mask to meditate",
      "Making weird faces when I'm tired",
      "Eating everything while doing butt kicks",
      "Collecting broken calculators",
      "Wearing a helmet to meditate",
      "Making up fake scores",
      "Eating everything while doing arm circles",
      "Talking to my fence",
      "Wearing a hazmat suit to meditate",
      "Making sound effects for my circulation",
      "Eating everything while doing leg swings",
      "Collecting empty soap dispensers",
      "Wearing a space helmet to relax",
      "Making up fake rankings",
      "Eating everything while doing neck rolls",
      "Talking to my gate",
      "Wearing a snorkel to relax",
      "Making weird noises when I'm relaxed",
      "Eating everything while doing shoulder shrugs",
      "Collecting used dental floss",
      "Wearing a wetsuit to relax",
      "Making up fake statistics",
      "Eating everything while doing ankle rolls",
      "Talking to my mailbox flag",
      "Wearing a diving mask to relax",
      "Making sound effects for my metabolism",
      "Eating everything while doing wrist circles",
      "Collecting empty lotion bottles",
      "Wearing a helmet to relax",
      "Making up fake percentages",
      "Eating everything while doing finger exercises",
      "Talking to my house numbers",
      "Wearing a hazmat suit to relax",
      "Making weird faces when I'm bored",
      "Eating everything while doing toe wiggles",
      "Collecting broken remote controls",
      "Wearing a space suit to nap",
      "Making up fake data",
      "Eating everything while doing eye exercises",
      "Talking to my doorframe",
      "Wearing a snorkel to nap",
      "Making sound effects for my immune system",
      "Eating everything while doing facial exercises",
      "Collecting empty shampoo bottles",
      "Wearing a wetsuit to nap",
      "Making up fake measurements",
      "Eating everything while doing breathing exercises",
      "Talking to my window sill",
      "Wearing a diving mask to nap",
      "Making weird noises when I'm dreaming",
      "Eating everything while doing meditation poses",
      "Collecting used tissues",
      "Wearing a helmet to nap",
      "Making up fake calculations",
      "Eating everything while doing yoga poses",
      "Talking to my door handle",
      "Wearing a hazmat suit to nap",
      "Making sound effects for my nervous system",
      "Eating everything while doing stretches",
      "Collecting empty vitamin bottles",
      "Wearing a space helmet to sleep",
      "Making up fake formulas",
      "Eating everything while doing balance exercises",
      "Talking to my light fixture",
      "Wearing a snorkel to sleep",
      "Making weird faces when I'm sleeping",
      "Eating everything while doing coordination exercises",
      "Collecting broken headphones",
      "Wearing a wetsuit to sleep",
      "Making up fake equations",
      "Eating everything while doing agility drills",
      "Talking to my ceiling",
      "Wearing a diving mask to sleep",
      "Making sound effects for my dreams out loud",
      "Eating everything while doing flexibility exercises",
      "Collecting empty perfume bottles",
      "Wearing a helmet to sleep",
      "Making up fake algorithms",
      "Eating everything while doing endurance exercises",
      "Talking to my floor",
      "Wearing a hazmat suit to sleep",
      "Making weird noises in my sleep",
      "Eating everything while doing strength exercises",
      "Collecting used cotton balls",
      "Wearing a space suit to dream",
      "Making up fake protocols",
      "Eating everything while doing cardio exercises",
      "Talking to my walls",
      "Wearing a snorkel to dream",
      "Making sound effects for my subconscious",
      "Eating everything while doing mental exercises",
      "Collecting empty deodorant containers",
      "Wearing a wetsuit to dream",
      "Making up fake procedures",
      "Eating everything while doing brain exercises",
      "Talking to my corners",
      "Wearing a diving mask to dream",
      "Making weird faces in my dreams",
      "Eating everything while doing memory exercises",
      "Collecting broken watches",
      "Wearing a helmet to dream",
      "Making up fake methods",
      "Eating everything while doing concentration exercises",
      "Talking to my baseboards",
      "Wearing a hazmat suit to dream",
      "Making sound effects for my imagination",
      "Eating everything while doing focus exercises",
      "Collecting empty toothpaste tubes",
      "Wearing a space helmet to daydream",
      "Making up fake techniques",
      "Eating everything while doing attention exercises",
      "Talking to my crown molding",
      "Wearing a snorkel to daydream",
      "Making weird noises when I daydream",
      "Eating everything while doing awareness exercises",
      "Collecting used q-tips",
      "Wearing a wetsuit to daydream",
      "Making up fake systems",
      "Eating everything while doing mindfulness exercises",
      "Talking to my trim",
      "Wearing a diving mask to daydream",
      "Making sound effects for my creativity",
      "Eating everything while doing visualization exercises",
      "Collecting empty medicine bottles",
      "Wearing a helmet to daydream",
      "Making up fake processes",
      "Eating everything while doing imagination exercises",
      "Talking to my outlets",
      "Wearing a hazmat suit to daydream",
      "Making weird faces when I imagine things",
      "Eating everything while doing creative exercises",
      "Collecting broken pens",
      "Wearing a space suit to fantasize",
      "Making up fake workflows",
      "Eating everything while doing artistic exercises",
      "Talking to my switches",
      "Wearing a snorkel to fantasize",
      "Making sound effects for my fantasies",
      "Eating everything while doing expressive exercises",
      "Collecting empty containers of condiments",
      "Wearing a wetsuit to fantasize",
      "Making up fake blueprints",
      "Eating everything while doing interpretive exercises",
      "Talking to my vents",
      "Wearing a diving mask to fantasize",
      "Making weird noises when I fantasize",
      "Eating everything while doing performance exercises",
      "Collecting used batteries",
      "Wearing a helmet to fantasize",
      "Making up fake schematics",
      "Eating everything while doing dramatic exercises",
      "Talking to my thermostat",
      "Wearing a hazmat suit to fantasize"
    ],
    player1Cards: [],
    player2Cards: [],
    currentPrompt: '',
    player1Answer: '',
    player2Answer: '',
    round: 1,
    player1Score: 0,
    player2Score: 0,
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
    if (gameData.answers.length < 16) {
      Alert.alert(
        'Not Enough Cards',
        'You need at least 16 answer cards to play a full game. Add more cards in the "My Cards" tab.',
        [{ text: 'OK' }]
      );
      return;
    }

    const shuffledAnswers = shuffleArray(gameData.answers);
    const shuffledPrompts = shuffleArray(gameData.prompts);
    
    setGameData(prev => ({
      ...prev,
      player1Cards: shuffledAnswers.slice(0, 8),
      player2Cards: shuffledAnswers.slice(8, 16),
      currentPrompt: shuffledPrompts[0],
      player1Answer: '',
      player2Answer: '',
      round: 1,
      player1Score: 0,
      player2Score: 0,
    }));
    
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

    const shuffledPrompts = shuffleArray(gameData.prompts);
    const newPlayer1Cards = gameData.player1Cards.filter(card => card !== gameData.player1Answer);
    const newPlayer2Cards = gameData.player2Cards.filter(card => card !== gameData.player2Answer);

    setGameData(prev => ({
      ...prev,
      player1Cards: newPlayer1Cards,
      player2Cards: newPlayer2Cards,
      currentPrompt: shuffledPrompts[0],
      player1Answer: '',
      player2Answer: '',
      round: prev.round + 1,
    }));

    setGameState('player1-select');
  };

  const getCurrentCards = () => {
    if (gameState === 'player1-select') {
      return gameData.player1Cards;
    } else if (gameState === 'player2-select') {
      return gameData.player2Cards;
    }
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

  const renderSetupScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.title}>The Harbinger of Humor</Text>
        <Text style={styles.subtitle}>
          A hilarious card game for couples
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.gameInfo}>
          <View style={styles.infoRow}>
            <Users size={24} color="#6366F1" />
            <Text style={styles.infoText}>2 Players</Text>
          </View>
          <View style={styles.infoRow}>
            <Trophy size={24} color="#10B981" />
            <Text style={styles.infoText}>8 Rounds</Text>
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How to Play:</Text>
          <Text style={styles.instructionText}>
            1. Each player gets 8 answer cards{'\n'}
            2. A prompt card is shown to both players{'\n'}
            3. Select your funniest answer for the prompt{'\n'}
            4. Reveal answers and laugh together{'\n'}
            5. Continue for 8 rounds of hilarity!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={startNewGame}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.startButtonGradient}
          >
            <Text style={styles.startButtonText}>Start New Game</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.cardCounts}>
          <Text style={styles.cardCountText}>
            {gameData.prompts.length} Prompt Cards • {gameData.answers.length} Answer Cards
          </Text>
          {gameData.answers.length < 16 && (
            <Text style={styles.warningText}>
              ⚠️ Add more answer cards in "My Cards" tab for a full game
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderGameScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.gameHeader}
      >
        <View style={styles.gameHeaderTop}>
          <Text style={styles.gameTitle}>The Harbinger of Humor</Text>
          <TouchableOpacity
            style={styles.hideButton}
            onPress={() => setHideCards(!hideCards)}
          >
            {hideCards ? (
              <Eye size={20} color="#FFFFFF" />
            ) : (
              <EyeOff size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
        
        <Text style={styles.roundText}>Round {gameData.round} of 8</Text>
        <Text style={styles.playerText}>{getCurrentPlayer()}'s Turn</Text>
      </LinearGradient>

      <View style={styles.promptSection}>
        <Text style={styles.promptLabel}>Prompt Card</Text>
        <View style={styles.promptCard}>
          <Text style={styles.promptText}>{gameData.currentPrompt}</Text>
        </View>
      </View>

      <View style={styles.answerSection}>
        <Text style={styles.answerLabel}>
          Your Answer Cards ({getCurrentCards().length} remaining)
        </Text>
        
        {hideCards ? (
          <View style={styles.hiddenCards}>
            <EyeOff size={48} color="#9CA3AF" />
            <Text style={styles.hiddenText}>Cards Hidden</Text>
            <Text style={styles.hiddenSubtext}>
              Tap the eye icon to show cards when it's your turn
            </Text>
          </View>
        ) : (
          <ScrollView 
            style={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          >
            {getCurrentCards().map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerCard,
                  getSelectedAnswer() === answer && styles.selectedCard
                ]}
                onPress={() => selectAnswer(answer)}
              >
                <Text style={[
                  styles.answerText,
                  getSelectedAnswer() === answer && styles.selectedText
                ]}>
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {getSelectedAnswer() && !hideCards && (
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmSelection}
          >
            <Text style={styles.confirmButtonText}>
              {gameState === 'player1-select' ? 'Pass to Player 2' : 'Reveal Answers'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderRevealScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.gameHeader}
      >
        <Text style={styles.gameTitle}>The Harbinger of Humor</Text>
        <Text style={styles.roundText}>Round {gameData.round} Results</Text>
      </LinearGradient>

      <View style={styles.revealContent}>
        <View style={styles.promptSection}>
          <Text style={styles.promptLabel}>Prompt</Text>
          <View style={styles.promptCard}>
            <Text style={styles.promptText}>{gameData.currentPrompt}</Text>
          </View>
        </View>

        <View style={styles.answersReveal}>
          <View style={styles.playerAnswer}>
            <Text style={styles.playerLabel}>Player 1's Answer</Text>
            <View style={styles.revealCard}>
              <Text style={styles.revealText}>{gameData.player1Answer}</Text>
            </View>
          </View>

          <View style={styles.playerAnswer}>
            <Text style={styles.playerLabel}>Player 2's Answer</Text>
            <View style={styles.revealCard}>
              <Text style={styles.revealText}>{gameData.player2Answer}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={nextRound}
          >
            <Text style={styles.nextButtonText}>
              {gameData.round >= 8 ? 'Finish Game' : 'Next Round'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFinishedScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.title}>Game Complete!</Text>
        <Text style={styles.subtitle}>
          Thanks for playing The Harbinger of Humor
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.gameComplete}>
          <Trophy size={64} color="#10B981" />
          <Text style={styles.completeTitle}>
            You've completed all 8 rounds!
          </Text>
          <Text style={styles.completeText}>
            Hope you had some great laughs together. Ready for another round of hilarity?
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setGameState('setup')}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.startButtonGradient}
          >
            <RotateCcw size={20} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Play Again</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  switch (gameState) {
    case 'setup':
      return renderSetupScreen();
    case 'player1-select':
    case 'player2-select':
      return renderGameScreen();
    case 'reveal':
      return renderRevealScreen();
    case 'finished':
      return renderFinishedScreen();
    default:
      return renderSetupScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  gameHeader: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  gameHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    marginTop: 8,
  },
  roundText: {
    fontSize: 14,
    color: '#C7D2FE',
    marginBottom: 4,
  },
  playerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  hideButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  instructions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  startButton: {
    marginBottom: 24,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardCounts: {
    alignItems: 'center',
  },
  cardCountText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
  },
  promptSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  promptLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#6366F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  promptText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 26,
  },
  answerSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  cardsContainer: {
    flex: 1,
  },
  answerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  answerText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  selectedText: {
    color: '#065F46',
    fontWeight: '600',
  },
  hiddenCards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    margin: 20,
  },
  hiddenText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  hiddenSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  actionSection: {
    padding: 20,
  },
  confirmButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revealContent: {
    flex: 1,
  },
  answersReveal: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  playerAnswer: {
    flex: 1,
  },
  playerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  revealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#10B981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  revealText: {
    fontSize: 16,
    color: '#065F46',
    lineHeight: 22,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  gameComplete: {
    alignItems: 'center',
    marginBottom: 40,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  completeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});