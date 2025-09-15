import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Trash2, CreditCard as Edit3, Save } from 'lucide-react-native';

export default function SettingsScreen() {
  const [prompts, setPrompts] = useState([
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
  ]);

  const [answers, setAnswers] = useState([
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
  ]);

  const [newPrompt, setNewPrompt] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingPrompt, setEditingPrompt] = useState<number | null>(null);
  const [editingAnswer, setEditingAnswer] = useState<number | null>(null);

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
    Alert.alert(
      'Delete Prompt',
      'Are you sure you want to delete this prompt?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setPrompts(prompts.filter((_, i) => i !== index))
        }
      ]
    );
  };

  const deleteAnswer = (index: number) => {
    Alert.alert(
      'Delete Answer',
      'Are you sure you want to delete this answer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setAnswers(answers.filter((_, i) => i !== index))
        }
      ]
    );
  };

  const editPrompt = (index: number, newText: string) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[index] = newText;
    setPrompts(updatedPrompts);
    setEditingPrompt(null);
  };

  const editAnswer = (index: number, newText: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = newText;
    setAnswers(updatedAnswers);
    setEditingAnswer(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>The Harbinger of Humor</Text>
        <Text style={styles.headerSubtitle}>
          Add your own prompts and answers to make the game more fun!
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Prompts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prompt Cards ({prompts.length})</Text>
          <Text style={styles.sectionDescription}>
            These are the questions or scenarios that will be shown to both players
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a new prompt..."
              value={newPrompt}
              onChangeText={setNewPrompt}
              multiline
            />
            <TouchableOpacity
              style={[styles.addButton, !newPrompt.trim() && styles.addButtonDisabled]}
              onPress={addPrompt}
              disabled={!newPrompt.trim()}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardsContainer}>
            {prompts.map((prompt, index) => (
              <View key={index} style={styles.card}>
                {editingPrompt === index ? (
                  <View style={styles.editContainer}>
                    <TextInput
                      style={styles.editInput}
                      value={prompt}
                      onChangeText={(text) => {
                        const updatedPrompts = [...prompts];
                        updatedPrompts[index] = text;
                        setPrompts(updatedPrompts);
                      }}
                      multiline
                      autoFocus
                    />
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => setEditingPrompt(null)}
                    >
                      <Save size={16} color="#10B981" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <Text style={styles.cardText}>{prompt}</Text>
                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setEditingPrompt(index)}
                      >
                        <Edit3 size={16} color="#6366F1" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => deletePrompt(index)}
                      >
                        <Trash2 size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Answers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Answer Cards ({answers.length})</Text>
          <Text style={styles.sectionDescription}>
            These are the possible answers that players can choose from. You need at least 16 for a full game.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a new answer..."
              value={newAnswer}
              onChangeText={setNewAnswer}
              multiline
            />
            <TouchableOpacity
              style={[styles.addButton, !newAnswer.trim() && styles.addButtonDisabled]}
              onPress={addAnswer}
              disabled={!newAnswer.trim()}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardsContainer}>
            {answers.map((answer, index) => (
              <View key={index} style={styles.card}>
                {editingAnswer === index ? (
                  <View style={styles.editContainer}>
                    <TextInput
                      style={styles.editInput}
                      value={answer}
                      onChangeText={(text) => {
                        const updatedAnswers = [...answers];
                        updatedAnswers[index] = text;
                        setAnswers(updatedAnswers);
                      }}
                      multiline
                      autoFocus
                    />
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => setEditingAnswer(null)}
                    >
                      <Save size={16} color="#10B981" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <Text style={styles.cardText}>{answer}</Text>
                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setEditingAnswer(index)}
                      >
                        <Edit3 size={16} color="#6366F1" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => deleteAnswer(index)}
                      >
                        <Trash2 size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#6366F1',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#6366F1',
    paddingBottom: 4,
  },
  saveButton: {
    padding: 8,
  },
  bottomPadding: {
    height: 100,
  },
});