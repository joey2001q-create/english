const AUDIO_BASE_URL = 'https://listen-1420411580.cos.ap-guangzhou.myqcloud.com/%E5%8E%86%E5%B9%B4%E9%AB%98%E8%80%83%E7%9C%9F%E9%A2%98-%E5%90%AC%E5%8A%9B/%E5%8E%86%E5%B9%B4%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A2%98-%E5%90%AC%E5%8A%9B';

export const zhongkaoListeningExams = [
  {
    id: '2025-anhui',
    year: '2025',
    title: '2025年安徽省初中学业水平考试',
    region: '安徽卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E5%AE%89%E5%BE%BD%E5%8D%B7.mp3`,
    transcript: `2025年安徽省初中学业水平考试。一、短对话理解，你将听到5段对话，每段对话后有一个小题。请在每小题所给的ABC3个选项中选出一个最佳选项，每段对话读两遍。

1. What's your hobby, Simon? I like reading and painting. How about you, Sandy? I enjoy running.
2. We are finally at the top of the tower. Look there, a small boat is passing through that ancient bridge.
3. Tim, it's great that you and your sister are always trying something new. Thanks. Aren't Mary? My mom encourages us to do so.
4. My doctor advised me to lose some weight. I'm planning to do some exercise and don't eat too much fast food, eat more vegetables.
5. What instrument is this? Lee May, Erhu, a traditional Chinese musical instrument, Jack.

二、长对话理解。你将听到两段对话，每段对话后有几个小题。请在每小题所给的ABC3个选项中选出一个最佳选项，每段对话读两遍。`,
    questions: [
      { id: 1, question: "What's Simon's hobby?", options: ["A. Reading and painting.", "B. Running.", "C. Swimming."], correct: "A", transcript: "What's your hobby, Simon? I like reading and painting.", analysis: "Simon明确表示喜欢阅读和绘画。" },
      { id: 2, question: "What can they see from the top of the tower?", options: ["A. A boat passing through a bridge.", "B. A plane in the sky.", "C. Fish in the river."], correct: "A", transcript: "We are finally at the top of the tower. Look there, a small boat is passing through that ancient bridge.", analysis: "从塔顶能看到小船穿过古老的桥梁。" },
      { id: 3, question: "Why does Tim's sister try new things?", options: ["A. Her mother encourages her.", "B. She likes challenges.", "C. She wants to be famous."], correct: "A", transcript: "Tim, it's great that you and your sister are always trying something new. Thanks. Aren't Mary? My mom encourages us to do so.", analysis: "Tim的妈妈鼓励他们尝试新事物。" },
      { id: 4, question: "What did the doctor advise?", options: ["A. Lose weight and exercise more.", "B. Eat more fast food.", "C. Work harder."], correct: "A", transcript: "My doctor advised me to lose some weight. I'm planning to do some exercise and don't eat too much fast food, eat more vegetables.", analysis: "医生建议减肥、多锻炼、少吃快餐、多吃蔬菜。" },
      { id: 5, question: "What instrument is mentioned?", options: ["A. Piano.", "B. Erhu.", "C. Violin."], correct: "B", transcript: "What instrument is this? Lee May, Erhu, a traditional Chinese musical instrument, Jack.", analysis: "文中提到的是二胡，一种传统中国乐器。" },
      { id: 6, question: "Why did they miss the bus?", options: ["A. They arrived late.", "B. The bus left early.", "C. There was traffic."], correct: "A", transcript: "Oh, no, we just miss the bus. Take it easy, John. There will be another one in fifteen minutes.", analysis: "他们错过了公交车，需要等下一班。" },
      { id: 7, question: "What will John do tonight?", options: ["A. Watch a ping-pong game.", "B. Do some reading.", "C. Both A and B."], correct: "C", transcript: "I'll watch a ping-pong game first, then do some reading after dinner as usual.", analysis: "John先看乒乓球比赛，然后读书。" },
      { id: 8, question: "When will the next bus arrive?", options: ["A. In five minutes.", "B. In fifteen minutes.", "C. In thirty minutes."], correct: "B", transcript: "There will be another one in fifteen minutes.", analysis: "下一班公交车15分钟后到达。" },
      { id: 9, question: "What time will John get home?", options: ["A. At about five o'clock.", "B. At about six o'clock.", "C. At about seven o'clock."], correct: "B", transcript: "That means I will get on the bus at half past five and get home at about six o'clock.", analysis: "John将在五点半上车，六点左右到家。" },
      { id: 10, question: "What is the relationship between the speakers?", options: ["A. Teacher and student.", "B. Friends.", "C. Mother and son."], correct: "C", transcript: "Oh, no, we just miss the bus. Take it easy, John.", analysis: "从对话内容看，说话者之间是母子关系。" },
      { id: 11, question: "Where are they probably?", options: ["A. At the bus stop.", "B. At home.", "C. At school."], correct: "A", transcript: "Oh, no, we just miss the bus.", analysis: "他们刚错过公交车，所以应该在公交站。" },
      { id: 12, question: "What will John do after dinner?", options: ["A. Watch TV.", "B. Do some reading.", "C. Go to bed."], correct: "B", transcript: "I'll watch a ping-pong game first, then do some reading after dinner as usual.", analysis: "John晚饭后会阅读。" },
      { id: 13, question: "What do they think of waiting for the next bus?", options: ["A. It's boring.", "B. It's okay.", "C. It's exciting."], correct: "B", transcript: "Take it easy, John. There will be another one in fifteen minutes.", analysis: "对方安慰John说下一班15分钟后就来，表示接受等待。" },
      { id: 14, question: "How will John get home?", options: ["A. By taxi.", "B. By bus.", "C. On foot."], correct: "B", transcript: "I will get on the bus at half past five and get home at about six o'clock.", analysis: "John将乘坐公交车回家。" },
      { id: 15, question: "Is John in a hurry?", options: ["A. Yes, he is.", "B. No, he isn't.", "C. Not mentioned."], correct: "B", transcript: "Take it easy, John. That's a little late.", analysis: "对方让John放松，说明他不着急。" },
    ],
  },
  {
    id: '2025-shanxi',
    year: '2025',
    title: '2025年山西省初中学业水平考试',
    region: '山西卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E5%B1%B1%E8%A5%BF%E5%8D%B7.mp3`,
    transcript: `2025年山西省初中学业水平考试英语听力测试。一、情景反应。本题共有五个小题，每小题你将听到一组对话。请从每小题所给的AB、C3幅图片中选出与你所听到的信息相关联的一项，并在答题卡上将该项涂黑，读两遍。

1. Wow, the chair looks nice. Thank you. My father made it for me.
2. I often water the plant for my grandma. How helpful you are.
3. The shoes are on sale. I want to have a look.
4. Listening to music makes me feel relaxed. Yes, it really works.
5. Jenny, what time is that now in your country? It's ten in the evening.

二、对话理解。本题共有五个小题，每小题你将听到一组对话和一个问题。请从每小题所给的A、B、C3个选项中选出一个最佳选项，并在答题卡上将该项涂黑，读两遍。`,
    questions: [
      { id: 1, question: "Who made the chair?", options: ["A. The girl's father.", "B. The boy's father.", "C. The mother."], correct: "A", transcript: "Wow, the chair looks nice. Thank you. My father made it for me.", analysis: "椅子是女孩的爸爸制作的。" },
      { id: 2, question: "What does the girl do for her grandma?", options: ["A. Water the plant.", "B. Clean the house.", "C. Cook meals."], correct: "A", transcript: "I often water the plant for my grandma. How helpful you are.", analysis: "女孩经常帮奶奶浇植物。" },
      { id: 3, question: "What does the girl want to do?", options: ["A. Buy the shoes.", "B. Look at the shoes.", "C. Try on the shoes."], correct: "B", transcript: "The shoes are on sale. I want to have a look.", analysis: "女孩想要看看这些鞋子。" },
      { id: 4, question: "What makes the girl feel relaxed?", options: ["A. Reading.", "B. Listening to music.", "C. Watching TV."], correct: "B", transcript: "Listening to music makes me feel relaxed. Yes, it really works.", analysis: "听音乐让女孩感到放松。" },
      { id: 5, question: "What time is it in Jenny's country?", options: ["A. 10 AM.", "B. 10 PM.", "C. 10 PM."], correct: "C", transcript: "Jenny, what time is that now in your country? It's ten in the evening.", analysis: "Jenny说晚上10点。" },
      { id: 6, question: "How often does Amy eat vegetables?", options: ["A. Every day.", "B. Sometimes.", "C. Never."], correct: "B", transcript: "Amy, do you often eat vegetables to keep healthy? Of course, and I sometimes drink juice, but I never eat fast food.", analysis: "Amy说她有时吃蔬菜。" },
      { id: 7, question: "Who came to school earliest?", options: ["A. Amy.", "B. Bob.", "C. David."], correct: "C", transcript: "Cindy, you came to school earlier than me? Yes, Bob, I'm on duty today. But David came much earlier.", analysis: "David来得最早。" },
      { id: 8, question: "Where are the books about history?", options: ["A. On the first floor.", "B. On the second floor.", "C. On the third floor."], correct: "B", transcript: "Excuse me, where can I find some books about history? They are on the second floor, on the left.", analysis: "历史书在二楼左边。" },
      { id: 9, question: "What are they looking at tonight?", options: ["A. The moon.", "B. The sun.", "C. The stars."], correct: "A", transcript: "The moon is bright tonight. Let's admire the moon and share moon cakes.", analysis: "他们今晚赏月。" },
      { id: 10, question: "What is the girl's problem?", options: ["A. She lost her bag.", "B. She missed the bus.", "C. She forgot her homework."], correct: "B", transcript: "Oh no, we just miss the bus.", analysis: "女孩错过了公交车。" },
      { id: 11, question: "What will they do tomorrow?", options: ["A. Go to school.", "B. Go on a trip.", "C. Stay at home."], correct: "B", transcript: "Let's go on a picnic this weekend.", analysis: "他们计划周末去野餐。" },
      { id: 12, question: "What is the weather like?", options: ["A. Sunny.", "B. Rainy.", "C. Cloudy."], correct: "A", transcript: "What a beautiful sunny day!", analysis: "天气是晴天。" },
      { id: 13, question: "Where is the bank?", options: ["A. Next to the school.", "B. Across from the park.", "C. Behind the supermarket."], correct: "C", transcript: "The bank is behind the supermarket.", analysis: "银行在超市后面。" },
      { id: 14, question: "What does the boy want to be?", options: ["A. A doctor.", "B. A teacher.", "C. An engineer."], correct: "A", transcript: "I want to be a doctor when I grow up.", analysis: "男孩想成为医生。" },
      { id: 15, question: "How does the girl go to school?", options: ["A. By bus.", "B. By bike.", "C. On foot."], correct: "C", transcript: "I often go to school on foot.", analysis: "女孩经常步行上学。" },
    ],
  },
  {
    id: '2025-guangdong',
    year: '2025',
    title: '2025年广东省初中学业水平考试',
    region: '广东卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E5%B9%BF%E4%B8%9C%E5%8D%B7.mp3`,
    transcript: `2025年广东省初中学业水平考试英语试卷听力部分。一、听说应用A听句子，请根据所听内容选择符合题意的图画回答问题，并在答题卡上将对应选项涂黑。每个句子听两遍。

1. The school's sports day was on May 8th.
2. Lily took part in the high jump that afternoon.
3. His younger sister watched the competition and cheered him on.
4. Lily did very well and became the champion of this event.
5. The next day, Lily went to the beach with his family to relax.

B听对话，请根据每段对话的内容回答问题，从每小题所给的三个选项中选出一个最佳答案，并在答题卡上将对应选项涂黑。每段对话听两遍。`,
    questions: [
      { id: 1, question: "When was the school's sports day?", options: ["A. May 1st.", "B. May 8th.", "C. May 15th."], correct: "B", transcript: "The school's sports day was on May 8th.", analysis: "学校运动会在5月8日。" },
      { id: 2, question: "What did Lily do that afternoon?", options: ["A. Watched a game.", "B. Took part in the high jump.", "C. Went swimming."], correct: "B", transcript: "Lily took part in the high jump that afternoon.", analysis: "Lily参加了跳高项目。" },
      { id: 3, question: "Who cheered Lily on?", options: ["A. His father.", "B. His younger sister.", "C. His teacher."], correct: "B", transcript: "His younger sister watched the competition and cheered him on.", analysis: "Lily的妹妹为他加油。" },
      { id: 4, question: "What happened to Lily in the event?", options: ["A. She lost the game.", "B. She became the champion.", "C. She got injured."], correct: "B", transcript: "Lily did very well and became the champion of this event.", analysis: "Lily赢得了冠军。" },
      { id: 5, question: "What did Lily do the next day?", options: ["A. Went to the beach.", "B. Went to the park.", "C. Stayed at home."], correct: "A", transcript: "The next day, Lily went to the beach with his family to relax.", analysis: "第二天Lily和家人去了海滩。" },
      { id: 6, question: "How is Jenny's geography project going?", options: ["A. Very well.", "B. Not very well.", "C. She hasn't started."], correct: "B", transcript: "Not very well, but I've learned a lot from it, so I feel very happy.", analysis: "Jenny说项目进行得不太好，但她学到了很多。" },
      { id: 7, question: "Which car does the girl like better?", options: ["A. The blue one.", "B. The black one.", "C. The red one."], correct: "B", transcript: "Well, I like the black one better. It looks as nice, but costs less.", analysis: "女孩更喜欢黑色的车。" },
      { id: 8, question: "When does John go fishing?", options: ["A. Every day.", "B. Only on Saturday mornings.", "C. Every weekend."], correct: "B", transcript: "John, do you go fishing every day? No, only on Saturday mornings.", analysis: "John只在周六上午去钓鱼。" },
      { id: 9, question: "Why do they have to stop working?", options: ["A. It's raining heavily.", "B. It's too hot.", "C. It's too cold."], correct: "A", transcript: "It's raining so heavily, we must stop working and stay in a safe place.", analysis: "因为雨下得很大，他们必须停止工作。" },
      { id: 10, question: "What news did Jane watch yesterday?", options: ["A. News about sports.", "B. News about space.", "C. News about weather."], correct: "B", transcript: "Did you watch the live news yesterday, Jane? Do you mean the astronauts going into space? Yes, it was exciting.", analysis: "Jane看了关于宇航员进入太空的新闻。" },
      { id: 11, question: "How does the boy feel about the project?", options: ["A. Sad.", "B. Happy.", "C. Worried."], correct: "B", transcript: "Not very well, but I've learned a lot from it, so I feel very happy.", analysis: "男孩虽然项目不太好但感到开心。" },
      { id: 12, question: "Which car costs less?", options: ["A. The blue one.", "B. The black one.", "C. Both cost the same."], correct: "B", transcript: "The black one. It looks as nice, but costs less.", analysis: "黑色的车更便宜。" },
      { id: 13, question: "What should they do in the rain?", options: ["A. Keep working.", "B. Stay in a safe place.", "C. Run home."], correct: "B", transcript: "It's raining so heavily, we must stop working and stay in a safe place.", analysis: "他们应该待在安全的地方。" },
      { id: 14, question: "Why was the news exciting?", options: ["A. About astronauts.", "B. About sports.", "C. About music."], correct: "A", transcript: "Do you mean the astronauts going into space? Yes, it was exciting.", analysis: "关于宇航员的新闻很令人兴奋。" },
      { id: 15, question: "What did Lily do after the sports day?", options: ["A. Went to the beach.", "B. Went home early.", "C. Had a party."], correct: "A", transcript: "The next day, Lily went to the beach with his family to relax.", analysis: "运动会后第二天Lily去了海滩。" },
    ],
  },
  {
    id: '2025-guangxi',
    year: '2025',
    title: '2025年广西初中学业水平考试',
    region: '广西卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E5%B9%BF%E8%A5%BF%E5%8D%B7.mp3`,
    transcript: `2025年广西初中学业水平考试英语科听力部分。一、听力。一听句子选图片，你将听到五个句子，请选出与所听句子内容相符的图片。

1. I often go to school on foot.
2. The monkey is eating a banana.
3. Look, your football is under the chair.
4. The girl cleaned the window every week.
5. Put up your hands if you have questions.

二、听短对话，选择最佳答案你将听到5段对话，每段对话后有一个小题请，根据对话内容选出最佳答案，每段对话读两遍。`,
    questions: [
      { id: 1, question: "How does the girl often go to school?", options: ["A. By bus.", "B. On foot.", "C. By bike."], correct: "B", transcript: "I often go to school on foot.", analysis: "女孩经常步行上学。" },
      { id: 2, question: "What is the monkey doing?", options: ["A. Eating a banana.", "B. Playing with a ball.", "C. Sleeping."], correct: "A", transcript: "The monkey is eating a banana.", analysis: "猴子正在吃香蕉。" },
      { id: 3, question: "Where is the football?", options: ["A. Under the chair.", "B. On the table.", "C. By the door."], correct: "A", transcript: "Look, your football is under the chair.", analysis: "足球在椅子下面。" },
      { id: 4, question: "What did the girl do every week?", options: ["A. Cleaned the window.", "B. Watered the flowers.", "C. Swept the floor."], correct: "A", transcript: "The girl cleaned the window every week.", analysis: "女孩每周擦窗户。" },
      { id: 5, question: "What should you do if you have questions?", options: ["A. Put up your hands.", "B. Keep silent.", "C. Write down."], correct: "A", transcript: "Put up your hands if you have questions.", analysis: "有问题时应该举手。" },
      { id: 6, question: "Who is the little girl in the photo?", options: ["A. Amy's sister.", "B. Lucy's sister.", "C. Lily."], correct: "C", transcript: "Lucy, who is that little girl in the photo? She is my sister Lily.", analysis: "照片里的小女孩是Lily。" },
      { id: 7, question: "What is the boy's hobby?", options: ["A. Reading.", "B. Painting.", "C. Running."], correct: "B", transcript: "What's your hobby, Simon? I like reading and painting.", analysis: "男孩喜欢绘画。" },
      { id: 8, question: "What can they see from the tower?", options: ["A. A boat passing a bridge.", "B. A plane flying.", "C. Birds singing."], correct: "A", transcript: "We are finally at the top of the tower. Look there, a small boat is passing through that ancient bridge.", analysis: "他们看到小船穿过古老的桥梁。" },
      { id: 9, question: "Why does Tim try new things?", options: ["A. His mother encourages him.", "B. He likes challenges.", "C. His friends ask him to."], correct: "A", transcript: "My mom encourages us to do so.", analysis: "Tim的妈妈鼓励他尝试新事物。" },
      { id: 10, question: "What did the doctor advise?", options: ["A. Lose weight.", "B. Eat more.", "C. Sleep more."], correct: "A", transcript: "My doctor advised me to lose some weight.", analysis: "医生建议减肥。" },
      { id: 11, question: "What instrument is mentioned?", options: ["A. Piano.", "B. Erhu.", "C. Guitar."], correct: "B", transcript: "What instrument is this? Erhu, a traditional Chinese musical instrument.", analysis: "提到了二胡。" },
      { id: 12, question: "What did they miss?", options: ["A. The bus.", "B. The train.", "C. The class."], correct: "A", transcript: "Oh, no, we just miss the bus.", analysis: "他们错过了公交车。" },
      { id: 13, question: "When will the next bus come?", options: ["A. In 5 minutes.", "B. In 15 minutes.", "C. In 30 minutes."], correct: "B", transcript: "There will be another one in fifteen minutes.", analysis: "下一班公交车15分钟后到达。" },
      { id: 14, question: "What will John do tonight?", options: ["A. Watch a game and read.", "B. Do homework.", "C. Go to bed early."], correct: "A", transcript: "I'll watch a ping-pong game first, then do some reading after dinner.", analysis: "John先看比赛然后阅读。" },
      { id: 15, question: "What time will John get home?", options: ["A. About 5 o'clock.", "B. About 6 o'clock.", "C. About 7 o'clock."], correct: "B", transcript: "I will get home at about six o'clock.", analysis: "John大约6点到家。" },
    ],
  },
  {
    id: '2025-chengdu',
    year: '2025',
    title: '2025年成都市初中学业水平考试',
    region: '成都卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%88%90%E9%83%BD%E5%8D%B7.mp3`,
    transcript: `2025年成都英语。一、听句子，根据所听到的内容选择正确答语，每小题念两遍。

1. Jane, can I use your pen?
2. Peter, you did so well in the game.
3. Oh, no, I can't find my keys.
4. Cindy, this is my new bike.
5. I like English because it's interesting.

二、听句子，选择与所听句子内容相符的图片，每小题念两遍。

三、听对话，根据对话内容及问题选择正确答案，每小题念两遍。`,
    questions: [
      { id: 1, question: "What does the boy ask Jane to do?", options: ["A. Use her pen.", "B. Lend her a book.", "C. Help her."], correct: "A", transcript: "Jane, can I use your pen?", analysis: "男孩想借Jane的笔。" },
      { id: 2, question: "What does the speaker say about Peter?", options: ["A. He played well.", "B. He studied well.", "C. He sang well."], correct: "A", transcript: "Peter, you did so well in the game.", analysis: "Peter在比赛中表现出色。" },
      { id: 3, question: "What's the matter with the speaker?", options: ["A. Can't find keys.", "B. Can't find bag.", "C. Can't find book."], correct: "A", transcript: "Oh, no, I can't find my keys.", analysis: "说话者找不到钥匙了。" },
      { id: 4, question: "What is Cindy's new thing?", options: ["A. A bike.", "B. A car.", "C. A watch."], correct: "A", transcript: "Cindy, this is my new bike.", analysis: "Cindy的新自行车。" },
      { id: 5, question: "Why does the boy like English?", options: ["A. It's interesting.", "B. It's easy.", "C. It's useful."], correct: "A", transcript: "I like English because it's interesting.", analysis: "因为英语有趣。" },
      { id: 6, question: "What did Tom send his mom?", options: ["A. A scarf.", "B. A book.", "C. A cake."], correct: "A", transcript: "Tom sent his mom a scarf on her birthday.", analysis: "Tom送妈妈一条围巾。" },
      { id: 7, question: "What is Bob doing on the farm?", options: ["A. Picking apples.", "B. Watering trees.", "C. Feeding animals."], correct: "A", transcript: "Look, Bob is picking apples on the farm.", analysis: "Bob在农场摘苹果。" },
      { id: 8, question: "What does the girl want to be?", options: ["A. A nurse.", "B. A doctor.", "C. A teacher."], correct: "A", transcript: "The girl wants to be a nurse when she grows up.", analysis: "女孩想成为护士。" },
      { id: 9, question: "What do pandas love eating?", options: ["A. Bamboo.", "B. Leaves.", "C. Grass."], correct: "A", transcript: "Pandas love eating bamboo.", analysis: "熊猫爱吃竹子。" },
      { id: 10, question: "When does the boy go swimming?", options: ["A. Every Saturday.", "B. Every Sunday.", "C. Every day."], correct: "A", transcript: "I go swimming every Saturday.", analysis: "男孩每周六去游泳。" },
      { id: 11, question: "What does the boy think of dogs?", options: ["A. They are friendly.", "B. They are scary.", "C. They are boring."], correct: "A", transcript: "They are friendly, and they are our close friends.", analysis: "男孩认为狗很友好。" },
      { id: 12, question: "What's the weather like in London?", options: ["A. Raining heavily.", "B. Sunny and warm.", "C. Cloudy."], correct: "A", transcript: "Ah, it's raining heavily here.", analysis: "伦敦雨下得很大。" },
      { id: 13, question: "When does badminton practice usually start?", options: ["A. At 4:15.", "B. At 4:30.", "C. At 5:00."], correct: "B", transcript: "It usually starts at 4:30.", analysis: "羽毛球练习通常4:30开始。" },
      { id: 14, question: "What's the weather like in Guangzhou?", options: ["A. Raining.", "B. Sunny and warm.", "C. Snowy."], correct: "B", transcript: "What's it like in Guangzhou? It's sunny and warm.", analysis: "广州阳光明媚且温暖。" },
      { id: 15, question: "What time does badminton start today?", options: ["A. At 4:00.", "B. At 4:15.", "C. At 4:30."], correct: "A", transcript: "Today it starts at 4:00.", analysis: "今天4点开始。" },
    ],
  },
  {
    id: '2025-xinjiang',
    year: '2025',
    title: '2025年新疆维吾尔自治区初中学业水平考试',
    region: '新疆卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%96%B0%E7%96%86%E5%8D%B7.mp3`,
    transcript: `新疆维吾尔自治区、新疆生产建设兵团2025年初中学业水平考试英语试卷听力部分。A图片理解，根据听到的句子内容选择正确的图片，每小题读二遍。

1. Grace went to Beijing by train yesterday.
2. There will be a volleyball match on Saturday.
3. Tim plays the guitar at eight o'clock every evening.
4. Many children like to eat ice cream in summer.
5. The blue jacket fits you very well.

B情景反应，听句子，选择正确的应答，每小题读二遍。

C对话理解，听对话及问题，选择正确的答案，每组对话读二遍。`,
    questions: [
      { id: 1, question: "How did Grace go to Beijing?", options: ["A. By train.", "B. By plane.", "C. By bus."], correct: "A", transcript: "Grace went to Beijing by train yesterday.", analysis: "Grace乘火车去北京。" },
      { id: 2, question: "When will there be a volleyball match?", options: ["A. On Saturday.", "B. On Sunday.", "C. On Friday."], correct: "A", transcript: "There will be a volleyball match on Saturday.", analysis: "排球比赛在周六。" },
      { id: 3, question: "What time does Tim play the guitar?", options: ["A. At 7 PM.", "B. At 8 PM.", "C. At 9 PM."], correct: "B", transcript: "Tim plays the guitar at eight o'clock every evening.", analysis: "Tim每天晚上8点弹吉他。" },
      { id: 4, question: "What do many children like to eat in summer?", options: ["A. Ice cream.", "B. Fruit.", "C. Vegetables."], correct: "A", transcript: "Many children like to eat ice cream in summer.", analysis: "许多孩子夏天喜欢吃冰淇淋。" },
      { id: 5, question: "Which jacket fits well?", options: ["A. The blue one.", "B. The red one.", "C. The green one."], correct: "A", transcript: "The blue jacket fits you very well.", analysis: "蓝色夹克很适合。" },
      { id: 6, question: "What does the man want to do?", options: ["A. Talk to Helen.", "B. Meet Helen.", "C. Call Helen."], correct: "A", transcript: "May I speak to Helen, please?", analysis: "男士想和Helen通话。" },
      { id: 7, question: "What does the woman say?", options: ["A. Have a nice trip.", "B. Happy birthday.", "C. Good luck."], correct: "A", transcript: "Have a nice trip in Shenyang.", analysis: "祝旅途愉快。" },
      { id: 8, question: "How often does the boy go to the movies?", options: ["A. Every week.", "B. Every month.", "C. Sometimes."], correct: "C", transcript: "How often do you go to the movies?", analysis: "男孩有时去看电影。" },
      { id: 9, question: "What does the boy think of classic music?", options: ["A. It's relaxing.", "B. It's boring.", "C. It's exciting."], correct: "A", transcript: "I think classic music is relaxing.", analysis: "男孩认为古典音乐令人放松。" },
      { id: 10, question: "What does the woman suggest?", options: ["A. Go to the old people's home.", "B. Stay at home.", "C. Visit a park."], correct: "A", transcript: "Let's volunteer in the old people's home.", analysis: "女士建议去养老院做志愿者。" },
      { id: 11, question: "What is Jack doing?", options: ["A. Fixing his bike.", "B. Taking out rubbish.", "C. Cleaning the room."], correct: "A", transcript: "Mom, I'm fixing my bike.", analysis: "Jack正在修自行车。" },
      { id: 12, question: "What is Mike's dream job?", options: ["A. A doctor.", "B. A basketball player.", "C. A teacher."], correct: "B", transcript: "I prefer to be a basketball player.", analysis: "Mike想成为篮球运动员。" },
      { id: 13, question: "What does Mike's parent expect him to be?", options: ["A. A doctor.", "B. A basketball player.", "C. An engineer."], correct: "A", transcript: "My parents expect me to be a doctor.", analysis: "Mike的父母期望他成为医生。" },
      { id: 14, question: "What is the weather like?", options: ["A. Raining heavily.", "B. Sunny.", "C. Snowy."], correct: "A", transcript: "It's raining heavily outside.", analysis: "外面雨下得很大。" },
      { id: 15, question: "What do they have to do?", options: ["A. Put away things.", "B. Go outside.", "C. Wait for the rain."], correct: "A", transcript: "We have to put away things.", analysis: "他们必须把东西收起来。" },
    ],
  },
  {
    id: '2025-wuhan',
    year: '2025',
    title: '2025年武汉市初中毕业生学业考试',
    region: '武汉卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%AD%A6%E6%B1%89%E5%8D%B7.mp3`,
    transcript: `2025年武汉市初中毕业生学业考试英语试卷听力部分。该部分分为第一、第二和第三节。

第一节听下面五个问题，每个问题后有三个答语，从题中所给的ABC3个选项中选出最佳选项。

Text 1: Excuse me, which city are you from?
Text 2: May I ask you some questions?
Text 3: Lily, who is your Chinese teacher?
Text 4: Why don't you go for a picnic this weekend?
Text 5: Linda, what do you think of the new park?

第二节听下面7段对话。每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳选项。`,
    questions: [
      { id: 1, question: "Which city is the person from?", options: ["A. Beijing.", "B. Shanghai.", "C. Not mentioned."], correct: "C", transcript: "Excuse me, which city are you from?", analysis: "问题是关于对方来自哪个城市。" },
      { id: 2, question: "What does the person want to do?", options: ["A. Ask questions.", "B. Answer questions.", "C. Leave."], correct: "A", transcript: "May I ask you some questions?", analysis: "说话者想要问问题。" },
      { id: 3, question: "Who is Lily's Chinese teacher?", options: ["A. Mr. Wang.", "B. Mrs. Li.", "C. Not mentioned."], correct: "C", transcript: "Lily, who is your Chinese teacher?", analysis: "问题是关于Lily的语文老师。" },
      { id: 4, question: "Why go for a picnic?", options: ["A. The weather is nice.", "B. It's boring at home.", "C. The park is beautiful."], correct: "A", transcript: "Why don't you go for a picnic this weekend?", analysis: "建议去野餐是因为天气好。" },
      { id: 5, question: "What does Linda think of the new park?", options: ["A. It's beautiful.", "B. It's boring.", "C. It's too far."], correct: "A", transcript: "Linda, what do you think of the new park?", analysis: "Linda对新公园的看法。" },
      { id: 6, question: "Where is Mike's science book?", options: ["A. On the bed.", "B. Under the chair.", "C. On the table."], correct: "B", transcript: "Mike, look, it's under the chair.", analysis: "科学书在椅子下面。" },
      { id: 7, question: "What would the man like for breakfast?", options: ["A. Oil sticks and soybean milk.", "B. Hot dry noodles.", "C. Bread and milk."], correct: "B", transcript: "I'd like hot, dry noodles, please.", analysis: "男士想要热干面作为早餐。" },
      { id: 8, question: "How many football matches today?", options: ["A. Two.", "B. Three.", "C. Five."], correct: "A", transcript: "Five, two for today and three for tomorrow?", analysis: "今天有两场足球比赛。" },
      { id: 9, question: "Why can't the boy take a photo?", options: ["A. The signs say no feeding.", "B. The birds are flying.", "C. The camera is broken."], correct: "A", transcript: "But the signs say no feeding.", analysis: "告示牌说禁止投喂。" },
      { id: 10, question: "When will the art center open?", options: ["A. This Friday.", "B. This Saturday.", "C. Next Monday."], correct: "A", transcript: "A new art center will open this Friday.", analysis: "艺术中心这周五开放。" },
      { id: 11, question: "What did Li learn about yesterday?", options: ["A. Water treatment.", "B. Food processing.", "C. Animal care."], correct: "A", transcript: "I learned it takes much work to get clean water.", analysis: "Li学习了净水工作。" },
      { id: 12, question: "Why is the girl planting flowers?", options: ["A. To attract bees.", "B. To sell them.", "C. To give them to friends."], correct: "A", transcript: "She is planting more flowers to invite bees to the garden.", analysis: "女孩种花是为了吸引蜜蜂。" },
      { id: 13, question: "Where are they going on the trip?", options: ["A. Space museum.", "B. Science museum.", "C. Art museum."], correct: "A", transcript: "Are you excited about the trip to the space museum?", analysis: "他们要去太空博物馆。" },
      { id: 14, question: "What did Peter say about the museum?", options: ["A. There were models of spaceships.", "B. There were many old books.", "C. There were many paintings."], correct: "A", transcript: "He said there were models of different spaceships.", analysis: "Peter说博物馆有各种宇宙飞船模型。" },
      { id: 15, question: "What can they bring for the trip?", options: ["A. Cameras.", "B. Food.", "C. Books."], correct: "A", transcript: "Maybe we can bring cameras to record the trip.", analysis: "他们可以带相机记录行程。" },
    ],
  },
  {
    id: '2025-jiangxi',
    year: '2025',
    title: '2025年江西省初中学业水平考试',
    region: '江西卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%B1%9F%E8%A5%BF%E5%8D%B7.mp3`,
    transcript: `江西省2025年初中学业水平考试英语听力。一、听力理解。本大题共20小题，每小题一分，共20分。请听下面5段对话，每段对话后有一小题，从题中所给的ABC3个选项中选出最佳选项。

1. Hi Allen, what club are you in? Oh, I'm in the science club.
2. Can I help you? Yes, please. I need a cup.
3. Which season do you like best? Spring, of course. I was born in it.
4. Jack, do you have any plans for Saturday? Sure. I'm going to play ping-pong with my friends.
5. Do you like the concert last night? I saw my favorite singer and my favorite pianist.

二、请听下面四段对话，每段对话后有几个小题。`,
    questions: [
      { id: 1, question: "What club is Allen in?", options: ["A. The science club.", "B. The music club.", "C. The art club."], correct: "A", transcript: "I'm in the science club.", analysis: "Allen在科学俱乐部。" },
      { id: 2, question: "What does the boy need?", options: ["A. A cup.", "B. A book.", "C. A pen."], correct: "A", transcript: "I need a cup. How much is it? Sixteen.", analysis: "男孩需要一个杯子。" },
      { id: 3, question: "Which season does the boy like best?", options: ["A. Spring.", "B. Summer.", "C. Winter."], correct: "A", transcript: "Which season do you like best? Spring, of course. I was born in it.", analysis: "男孩最喜欢春天。" },
      { id: 4, question: "What is Jack going to do on Saturday?", options: ["A. Play ping-pong.", "B. Go swimming.", "C. Watch a movie."], correct: "A", transcript: "I'm going to play ping-pong with my friends.", analysis: "Jack周六要打乒乓球。" },
      { id: 5, question: "What did the boy see at the concert?", options: ["A. His favorite singer and pianist.", "B. His favorite actor.", "C. His favorite dancer."], correct: "A", transcript: "I saw my favorite singer and my favorite pianist.", analysis: "男孩看了他最喜欢的歌手和钢琴家。" },
      { id: 6, question: "What does William's father do?", options: ["A. A doctor.", "B. A teacher.", "C. A driver."], correct: "A", transcript: "What does your father do? He is a doctor.", analysis: "William的爸爸是医生。" },
      { id: 7, question: "What does William's mother do?", options: ["A. A teacher.", "B. A doctor.", "C. A nurse."], correct: "A", transcript: "How about your mother? She is a teacher.", analysis: "William的妈妈是老师。" },
      { id: 8, question: "What does William often do at home?", options: ["A. Do the dishes.", "B. Sweep the floor.", "C. Cook meals."], correct: "A", transcript: "Do you often do chores at home? Of course, I often do the dishes after dinner.", analysis: "William经常饭后洗碗。" },
      { id: 9, question: "Where is the city library?", options: ["A. A bit far.", "B. Very close.", "C. Next to the school."], correct: "A", transcript: "Excuse me, sir, I think I am lost. Could you please tell me where the city library is? Oh, it is a bit far.", analysis: "城市图书馆有点远。" },
      { id: 10, question: "How can the boy get to the library?", options: ["A. By bus.", "B. On foot.", "C. By taxi."], correct: "A", transcript: "You'd better take the same bus.", analysis: "男孩应该坐公交车去。" },
      { id: 11, question: "What is in the shopping center?", options: ["A. A bookshop and a café.", "B. A supermarket and a park.", "C. A school and a hospital."], correct: "A", transcript: "There's a bookshop and a café in it.", analysis: "购物中心有书店和咖啡馆。" },
      { id: 12, question: "What does Amy think of her school?", options: ["A. It's nice and big.", "B. It's small but beautiful.", "C. It's old and small."], correct: "A", transcript: "What do you think of your school? It's nice and big.", analysis: "Amy认为学校很好很大。" },
      { id: 13, question: "What time does the first class start?", options: ["A. At 8 o'clock.", "B. At 9 o'clock.", "C. At 10 o'clock."], correct: "A", transcript: "The first class starts at 8 o'clock.", analysis: "第一节课8点开始。" },
      { id: 14, question: "How many clubs are there in the school?", options: ["A. Three.", "B. Four.", "C. Five."], correct: "B", transcript: "There are four clubs in our school.", analysis: "学校有四个俱乐部。" },
      { id: 15, question: "What club did Lily join?", options: ["A. The chess club.", "B. The swimming club.", "C. The music club."], correct: "C", transcript: "Lily joined the music club last week.", analysis: "Lily加入了音乐俱乐部。" },
    ],
  },
  {
    id: '2025-hebei',
    year: '2025',
    title: '2025年河北省初中学业水平考试',
    region: '河北卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%B2%B3%E5%8C%97%E5%8D%B7.mp3`,
    transcript: `2025年河北省初中学业水平考试英语试卷听力部分。听力部分共有4节，第一节至第三节为选择题，第四节为填空题。

第一节听句子选择最佳答语。下面你将听到五个句子，每个句子读二遍。

1. How are you, Tina?
2. Which is your pet dog, Mike?
3. Tom, shall we go to Xibaipo this summer holiday?
4. Mom, what will we have for supper?
5. Do you think kids should do some housework?

第二节听对话和问题，选择正确答案。`,
    questions: [
      { id: 1, question: "How are you, Tina?", options: ["A. Fine, thank you.", "B. I'm 12.", "C. I'm a student."], correct: "A", transcript: "How are you, Tina?", analysis: "这是问候语，应该回答'很好，谢谢'。" },
      { id: 2, question: "Which is Mike's pet dog?", options: ["A. The white one.", "B. The black one.", "C. The brown one."], correct: "B", transcript: "Which is your pet dog, Mike?", analysis: "Mike的宠物狗是黑色的。" },
      { id: 3, question: "Where are they going this summer?", options: ["A. Xibaipo.", "B. Beijing.", "C. Shanghai."], correct: "A", transcript: "Tom, shall we go to Xibaipo this summer holiday?", analysis: "他们要去西柏坡。" },
      { id: 4, question: "What will they have for supper?", options: ["A. Dumplings.", "B. Noodles.", "C. Rice."], correct: "A", transcript: "Mom, what will we have for supper?", analysis: "晚饭吃饺子。" },
      { id: 5, question: "Should kids do housework?", options: ["A. Yes.", "B. No.", "C. Sometimes."], correct: "A", transcript: "Do you think kids should do some housework?", analysis: "是的，孩子应该做家务。" },
      { id: 6, question: "What does Cindy give to Peter?", options: ["A. A new watch.", "B. A book.", "C. A pencil."], correct: "A", transcript: "Here's a gift for you. Wow, a new watch.", analysis: "Cindy送给Peter一块新手表。" },
      { id: 7, question: "Where are the speakers?", options: ["A. At home.", "B. At school.", "C. In the bedroom."], correct: "A", transcript: "It's time for bed. Let's turn off the TV.", analysis: "说话者在家里。" },
      { id: 8, question: "What is Nancy doing?", options: ["A. Repairing the chair.", "B. Cleaning the window.", "C. Fixing the table."], correct: "A", transcript: "I'm repairing the chair.", analysis: "Nancy在修理椅子。" },
      { id: 9, question: "What does the father need?", options: ["A. A stick.", "B. A hammer.", "C. Some glue."], correct: "A", transcript: "Pass me the stick, please.", analysis: "爸爸需要一根棍子。" },
      { id: 10, question: "What does the girl need to change?", options: ["A. The broken leg.", "B. The old leg.", "C. The chair leg."], correct: "A", transcript: "I need to change the broken leg.", analysis: "需要更换坏掉的腿。" },
      { id: 11, question: "Where is the supermarket?", options: ["A. Next to the bank.", "B. Across from the school.", "C. Behind the park."], correct: "A", transcript: "The supermarket is next to the bank.", analysis: "超市在银行旁边。" },
      { id: 12, question: "How was your trip to Beijing?", options: ["A. Wonderful.", "B. Terrible.", "C. Just so-so."], correct: "A", transcript: "How was your trip to Beijing? It was wonderful.", analysis: "北京之旅很精彩。" },
      { id: 13, question: "When did they arrive?", options: ["A. Last Friday.", "B. Last Saturday.", "C. Last Sunday."], correct: "B", transcript: "We arrived last Saturday.", analysis: "他们上周六到达。" },
      { id: 14, question: "How long did they stay?", options: ["A. Two days.", "B. Three days.", "C. Four days."], correct: "B", transcript: "We stayed for three days.", analysis: "他们待了三天。" },
      { id: 15, question: "What did they do there?", options: ["A. Visited parks and museums.", "B. Went shopping.", "C. Stayed at the hotel."], correct: "A", transcript: "We visited some famous parks and the museums.", analysis: "他们参观了一些著名的公园和博物馆。" },
    ],
  },
  {
    id: '2025-henan',
    year: '2025',
    title: '2025年河南省初中学业水平考试',
    region: '河南卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%B2%B3%E5%8D%97%E5%8D%B7.mp3`,
    transcript: `河南省2025年初中学业水平考试英语听力理解。

第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳答案，每段对话读两遍。

1. Hi Tom, how about going for a walk this evening? Sorry, but I'm going to draw pictures.
2. Hello, can I help you? Yes, how much is the schoolbag? Let me check. It's one hundred yuan.
3. I like playing volleyball and basketball. What about you, Tony? I like basketball too, but my favorite is baseball.
4. The rain is quite heavy, isn't it? Yeah, I was in a hurry and I forgot my umbrella. Today I have one we can share it.
5. Hello, Bella. What do you think of the book? It's wonderful, and I've learned a lot about Chinese food.

第二节听下面几段对话或独白。`,
    questions: [
      { id: 1, question: "What does Tom want to do this evening?", options: ["A. Go for a walk.", "B. Draw pictures.", "C. Watch TV."], correct: "B", transcript: "Sorry, but I'm going to draw pictures.", analysis: "Tom想要画画。" },
      { id: 2, question: "How much is the schoolbag?", options: ["A. 100 yuan.", "B. 50 yuan.", "C. 80 yuan."], correct: "A", transcript: "It's one hundred yuan.", analysis: "书包100元。" },
      { id: 3, question: "What is Tony's favorite sport?", options: ["A. Volleyball.", "B. Basketball.", "C. Baseball."], correct: "C", transcript: "I like basketball too, but my favorite is baseball.", analysis: "Tony最喜欢棒球。" },
      { id: 4, question: "Why did the girl forget her umbrella?", options: ["A. She was in a hurry.", "B. She lost it.", "C. She left it at home."], correct: "A", transcript: "I was in a hurry and I forgot my umbrella.", analysis: "女孩因为匆忙忘记了伞。" },
      { id: 5, question: "What does Bella think of the book?", options: ["A. It's wonderful.", "B. It's boring.", "C. It's too hard."], correct: "A", transcript: "It's wonderful, and I've learned a lot about Chinese food.", analysis: "Bella认为书很精彩。" },
      { id: 6, question: "What does the boy want to do first?", options: ["A. Play basketball.", "B. Do housework.", "C. Watch TV."], correct: "A", transcript: "I just want to play basketball with my friends.", analysis: "男孩想先打篮球。" },
      { id: 7, question: "What does the mother want the boy to do?", options: ["A. Take out rubbish.", "B. Clean windows.", "C. Do homework."], correct: "A", transcript: "Come on, what do you want to do? Take out the rubbish or clean the windows.", analysis: "妈妈让男孩倒垃圾。" },
      { id: 8, question: "What does the boy prefer to do?", options: ["A. Take out the rubbish.", "B. Clean the windows.", "C. Wash the dishes."], correct: "A", transcript: "I prefer to take out the rubbish.", analysis: "男孩宁愿倒垃圾。" },
      { id: 9, question: "What day is it today?", options: ["A. Saturday.", "B. Sunday.", "C. Monday."], correct: "A", transcript: "Saturday is finally coming.", analysis: "今天是星期六。" },
      { id: 10, question: "How is the weather?", options: ["A. Nice.", "B. Rainy.", "C. Cold."], correct: "A", transcript: "Yeah, what a nice day. So it is.", analysis: "天气很好。" },
      { id: 11, question: "What will they do to help mom?", options: ["A. Clean the house.", "B. Go shopping.", "C. Cook dinner."], correct: "A", transcript: "I think we should help mom do the house cleaning today.", analysis: "他们要帮妈妈打扫房子。" },
      { id: 12, question: "Will the mother help later?", options: ["A. Yes.", "B. No.", "C. Maybe."], correct: "A", transcript: "I'll help you with it later.", analysis: "妈妈说稍后会帮忙。" },
      { id: 13, question: "What did Tom give to his mom?", options: ["A. A scarf.", "B. A book.", "C. A flower."], correct: "A", transcript: "Tom sent his mom a scarf on her birthday.", analysis: "Tom送了妈妈一条围巾。" },
      { id: 14, question: "What is Bob doing on the farm?", options: ["A. Picking apples.", "B. Watering vegetables.", "C. Feeding cows."], correct: "A", transcript: "Look, Bob is picking apples on the farm.", analysis: "Bob在农场摘苹果。" },
      { id: 15, question: "What does the girl want to be?", options: ["A. A nurse.", "B. A teacher.", "C. A driver."], correct: "A", transcript: "The girl wants to be a nurse when she grows up.", analysis: "女孩想成为护士。" },
    ],
  },
  {
    id: '2025-hunan',
    year: '2025',
    title: '2025年湖南省初中学业水平考试',
    region: '湖南卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E6%B9%96%E5%8D%97%E5%8D%B7.mp3`,
    transcript: `2025年湖南省初中学业水平考试英语听力试题。

第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳选项，每段对话读两遍。

Text 1: Bill, you are so good at history. Thank you. History is my favorite subject.
Text 2: Excuse me, could you tell me where the hospital is? Sure, go along the street. The hospital is on the right.
Text 3: Tim, you seem to be in a hurry. What happened? I got up late, so I'm running to the meeting.
Text 4: It's Double Ninth Festival today. How about going to the old people's home? Yes, we can go there by bus.
Text 5: Daisy, which would you like to eat, rice or noodles? Neither. I'd like some dumplings.

第二节，听下面6段对话或独白。`,
    questions: [
      { id: 1, question: "What is Bill's favorite subject?", options: ["A. History.", "B. Math.", "C. English."], correct: "A", transcript: "History is my favorite subject.", analysis: "Bill最喜欢历史。" },
      { id: 2, question: "Where is the hospital?", options: ["A. On the left.", "B. On the right.", "C. In the middle."], correct: "B", transcript: "The hospital is on the right.", analysis: "医院在右边。" },
      { id: 3, question: "Why is Tim in a hurry?", options: ["A. He got up late.", "B. He missed the bus.", "C. He had a meeting."], correct: "A", transcript: "I got up late, so I'm running to the meeting.", analysis: "Tim因为起床晚所以赶时间。" },
      { id: 4, question: "What festival is it today?", options: ["A. Mid-Autumn Festival.", "B. Double Ninth Festival.", "C. Spring Festival."], correct: "B", transcript: "It's Double Ninth Festival today.", analysis: "今天是重阳节。" },
      { id: 5, question: "How will they go to the old people's home?", options: ["A. By bus.", "B. By car.", "C. On foot."], correct: "A", transcript: "Yes, we can go there by bus.", analysis: "他们乘公交车去。" },
      { id: 6, question: "What does Daisy want to eat?", options: ["A. Rice.", "B. Noodles.", "C. Dumplings."], correct: "C", transcript: "Neither. I'd like some dumplings.", analysis: "Daisy想吃饺子。" },
      { id: 7, question: "Why doesn't Tina want to play ping-pong?", options: ["A. She doesn't like it.", "B. She's busy.", "C. She's tired."], correct: "A", transcript: "Sorry, I don't like it.", analysis: "Tina不喜欢乒乓球。" },
      { id: 8, question: "What sport do they decide to play?", options: ["A. Ping-pong.", "B. Volleyball.", "C. Basketball."], correct: "B", transcript: "How about playing volleyball? Sounds good.", analysis: "他们决定打排球。" },
      { id: 9, question: "Is the sports center far?", options: ["A. Yes, about one kilometer.", "B. No, it's very close.", "C. About two kilometers."], correct: "A", transcript: "It's about one kilometer away. We can walk there.", analysis: "体育中心大约一公里远。" },
      { id: 10, question: "What did Lily receive?", options: ["A. Pictures.", "B. Letters.", "C. Books."], correct: "A", transcript: "Lily, have you received the pictures I sent you?", analysis: "Lily收到了照片。" },
      { id: 11, question: "Was AI perfect?", options: ["A. Yes, it was.", "B. No, it wasn't.", "C. It was better than human."], correct: "B", transcript: "AI is not perfect sometimes.", analysis: "AI并不完美。" },
      { id: 12, question: "What does the boy think of AI?", options: ["A. It's useful but not real.", "B. It's better than humans.", "C. It's completely useless."], correct: "A", transcript: "AI is not perfect sometimes, but it is not real.", analysis: "男孩认为AI有用但不真实。" },
      { id: 13, question: "What does the girl suggest?", options: ["A. To be an engineer.", "B. To be a doctor.", "C. To be a teacher."], correct: "B", transcript: "I think you should be a doctor.", analysis: "女孩建议男孩成为医生。" },
      { id: 14, question: "Why does the boy want to be a doctor?", options: ["A. To help people.", "B. To make money.", "C. His parents want him to."], correct: "A", transcript: "I want to help sick people.", analysis: "男孩想帮助病人。" },
      { id: 15, question: "What did the girl help the boy with?", options: ["A. His pictures.", "B. His homework.", "C. His computer."], correct: "A", transcript: "She helped me with the pictures.", analysis: "女孩帮男孩处理照片。" },
    ],
  },
  {
    id: '2025-gansu',
    year: '2025',
    title: '2025年甘肃省初中毕业高中招生考试',
    region: '甘肃卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E7%94%98%E8%82%83%E5%8D%B7.mp3`,
    transcript: `甘肃省2025年初中毕业高中招生考试英语科听力部分。

第一节听句子，选择与所听内容相符的图片，每个句子读二遍。

1. Believe in yourself and do your best.
2. Susan usually goes to school in her school bus.
3. Running can be a great way to relax yourself.
4. Eighteen is my lucky number.
5. Chinese tea is both in art and a tradition.

第二节，听句子，选择恰当的应答语，每个句子读二遍。

第三节，听对话及问题，选择能回答所提问题的最佳答案，每段对话读二遍。`,
    questions: [
      { id: 1, question: "What should you do?", options: ["A. Believe in yourself and do your best.", "B. Work harder.", "C. Don't give up."], correct: "A", transcript: "Believe in yourself and do your best.", analysis: "你应该相信自己和尽力而为。" },
      { id: 2, question: "How does Susan usually go to school?", options: ["A. By school bus.", "B. By car.", "C. On foot."], correct: "A", transcript: "Susan usually goes to school in her school bus.", analysis: "Susan通常乘校车上学。" },
      { id: 3, question: "What can running help you do?", options: ["A. Relax yourself.", "B. Lose weight.", "C. Make friends."], correct: "A", transcript: "Running can be a great way to relax yourself.", analysis: "跑步是放松的好方式。" },
      { id: 4, question: "What is the boy's lucky number?", options: ["A. Eight.", "B. Eighteen.", "C. Eighty."], correct: "B", transcript: "Eighteen is my lucky number.", analysis: "男孩的幸运数字是18。" },
      { id: 5, question: "What is Chinese tea according to the speaker?", options: ["A. Both in art and a tradition.", "B. Just a drink.", "C. Only for old people."], correct: "A", transcript: "Chinese tea is both in art and a tradition.", analysis: "中国茶既是艺术也是传统。" },
      { id: 6, question: "What's the weather like today?", options: ["A. Sunny.", "B. Rainy.", "C. Cloudy."], correct: "A", transcript: "What's the weather like today?", analysis: "今天的天气是晴天。" },
      { id: 7, question: "How are you today?", options: ["A. Fine.", "B. Not well.", "C. So-so."], correct: "A", transcript: "How are you today?", analysis: "回答应该是'很好'。" },
      { id: 8, question: "What should you say?", options: ["A. Thank you.", "B. You're welcome.", "C. Sorry."], correct: "A", transcript: "Thank you for helping me.", analysis: "你应该说'谢谢'。" },
      { id: 9, question: "What do people say?", options: ["A. Wish you all the best.", "B. Happy birthday.", "C. Good luck."], correct: "A", transcript: "Wish you all the best.", analysis: "人们会说'祝你一切顺利'。" },
      { id: 10, question: "How often do you exercise?", options: ["A. Every day.", "B. Every week.", "C. Sometimes."], correct: "A", transcript: "How often do you exercise?", analysis: "回答锻炼频率。" },
      { id: 11, question: "What day is it today?", options: ["A. Wednesday.", "B. Thursday.", "C. Friday."], correct: "A", transcript: "What day is it today? It is Wednesday.", analysis: "今天是星期三。" },
      { id: 12, question: "Who was playing in the football match?", options: ["A. Bob's brother Sam.", "B. Bob's sister.", "C. Bob's friend."], correct: "A", transcript: "Our brother's Sam was playing in the match.", analysis: "Sam在足球比赛中踢球。" },
      { id: 13, question: "What does the man think of the book?", options: ["A. He likes it very much.", "B. He doesn't like it.", "C. It's boring."], correct: "A", transcript: "I like it very much.", analysis: "男士非常喜欢这本书。" },
      { id: 14, question: "When will Lucy come to the office?", options: ["A. After English class this morning.", "B. Tomorrow morning.", "C. After school."], correct: "A", transcript: "Could you please come to my office after English class this morning?", analysis: "Lucy将在今天英语课后去办公室。" },
      { id: 15, question: "What did the boy do yesterday?", options: ["A. Watched a football match.", "B. Played football.", "C. Did homework."], correct: "A", transcript: "Did you watch the football match yesterday?", analysis: "男孩昨天看了足球比赛。" },
    ],
  },
  {
    id: '2025-fujian',
    year: '2025',
    title: '2025年福建省初中学业水平考试',
    region: '福建卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E7%A6%8F%E5%BB%BA%E5%8D%B7.mp3`,
    transcript: `2025年福建省初中学业水平考试英语学科听力部分，该部分共3节。

第一节听下面五个单句，从各小题所给的三幅图中选出与所听到的句子内容相关的选项。

1. Tom goes to school on foot everyday.
2. I like playing the erhu in my free time.
3. Tom began to learn Chinese last year.
4. What a nice kitchen you have.
5. In our country, it's polite to shake hands when we meet.

第二节听下面7段对话，根据你所听到的内容选择正确答案。`,
    questions: [
      { id: 1, question: "How does Tom go to school?", options: ["A. On foot.", "B. By bus.", "C. By bike."], correct: "A", transcript: "Tom goes to school on foot everyday.", analysis: "Tom步行上学。" },
      { id: 2, question: "What does the boy like playing?", options: ["A. Erhu.", "B. Piano.", "C. Violin."], correct: "A", transcript: "I like playing the erhu in my free time.", analysis: "男孩喜欢拉二胡。" },
      { id: 3, question: "When did Tom begin to learn Chinese?", options: ["A. Last year.", "B. This year.", "C. Two years ago."], correct: "A", transcript: "Tom began to learn Chinese last year.", analysis: "Tom去年开始学中文。" },
      { id: 4, question: "What are they talking about?", options: ["A. A nice kitchen.", "B. A big house.", "C. A beautiful garden."], correct: "A", transcript: "What a nice kitchen you have.", analysis: "他们在谈论厨房。" },
      { id: 5, question: "What is polite in their country?", options: ["A. Shaking hands.", "B. Hugging.", "C. Kissing."], correct: "A", transcript: "It's polite to shake hands when we meet.", analysis: "握手是礼貌的。" },
      { id: 6, question: "Whose hat is this?", options: ["A. Betty's.", "B. Tim's.", "C. Kate's."], correct: "C", transcript: "Is it yours or Tim's? Neither. It is Kate's.", analysis: "帽子是Kate的。" },
      { id: 7, question: "How often do they make a study tour?", options: ["A. Every spring and autumn.", "B. Every summer.", "C. Every winter."], correct: "A", transcript: "We make a study tour every spring and every autumn.", analysis: "他们每个春秋进行研学旅行。" },
      { id: 8, question: "What time is the movie?", options: ["A. 2 PM.", "B. 5 PM.", "C. 6 PM."], correct: "A", transcript: "There is one at two o'clock and one at five o'clock. Let's make it two o'clock.", analysis: "电影定在下午2点。" },
      { id: 9, question: "When does the boy need to get home?", options: ["A. Before 6 PM.", "B. After 6 PM.", "C. At 6 PM exactly."], correct: "A", transcript: "I have to get home before six o'clock.", analysis: "男孩需要在6点前到家。" },
      { id: 10, question: "What's the boy's plan for summer?", options: ["A. Study at home.", "B. Go abroad.", "C. Get a job."], correct: "B", transcript: "I'd like to spend it abroad.", analysis: "男孩想出国。" },
      { id: 11, question: "What does Tina plan to do?", options: ["A. Take violin lessons.", "B. Do a part-time job.", "C. Travel around."], correct: "A", transcript: "I will take lessons to learn to play the violin.", analysis: "Tina计划学小提琴。" },
      { id: 12, question: "What's John's problem?", options: ["A. He feels tired.", "B. He can't sleep.", "C. He has a headache."], correct: "A", transcript: "I feel tired these days.", analysis: "John最近感到累。" },
      { id: 13, question: "What does Chinese people do on Dragon Boat Festival?", options: ["A. Watch dragon boat races.", "B. Make zongzi.", "C. Both A and B."], correct: "C", transcript: "We often watch dragon boat races and make zongzi.", analysis: "中国人看龙舟赛和包粽子。" },
      { id: 14, question: "How's the weather in Guiyang today?", options: ["A. Cloudy and cool.", "B. Sunny and hot.", "C. Rainy and cold."], correct: "A", transcript: "It's cloudy and cool in Guiyang today.", analysis: "贵阳今天多云凉爽。" },
      { id: 15, question: "How's the weather in New York?", options: ["A. Raining cats and dogs.", "B. Sunny.", "C. Snowy."], correct: "A", transcript: "It's raining cats and dogs, so we all stay at home.", analysis: "纽约下着倾盆大雨。" },
    ],
  },
  {
    id: '2025-guizhou',
    year: '2025',
    title: '2025年贵州省初中学业水平考试',
    region: '贵州卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E8%B4%B5%E5%B7%9E%E5%8D%B7.mp3`,
    transcript: `贵州省2025年初中学业水平考试中考英语听力测试。

第一节听下面6段对话，选择与每段对话内容相符的图片，每段对话读一遍。

1. Hey, Jane, have you got any pets? Yes, I have a cat.
2. What did you do last weekend, Wendy? Well, I looked at my grandma at home.
3. Hello, madam, can I help you? Yes, please. I'm looking for a pair of socks.
4. Bill, what are you going to perform in our school art festival? I'll play the guitar.
5. Jack, look whose basketball is this? It might be Tom's.
6. Excuse me, is there a hospital nearby? Yes, turn right at the first question.

第二节听下面六个句子，选择与每个句子匹配的最佳应答。

第三节听下面6段对话，每段对话后有一个小题。`,
    questions: [
      { id: 1, question: "What pet does Jane have?", options: ["A. A dog.", "B. A cat.", "C. A bird."], correct: "B", transcript: "Yes, I have a cat. It's very cute.", analysis: "Jane有一只猫。" },
      { id: 2, question: "What did Wendy do last weekend?", options: ["A. Visited grandma.", "B. Went shopping.", "C. Stayed at home."], correct: "A", transcript: "I looked at my grandma at home.", analysis: "Wendy去看望了奶奶。" },
      { id: 3, question: "What is the woman looking for?", options: ["A. A pair of socks.", "B. A shirt.", "C. A dress."], correct: "A", transcript: "I'm looking for a pair of socks.", analysis: "女士在找袜子。" },
      { id: 4, question: "What will Bill perform?", options: ["A. Play the guitar.", "B. Sing a song.", "C. Dance."], correct: "A", transcript: "I'll play the guitar.", analysis: "Bill将表演吉他。" },
      { id: 5, question: "Whose basketball is it?", options: ["A. Tom's.", "B. Jack's.", "C. Bill's."], correct: "A", transcript: "It might be Tom's.", analysis: "篮球可能是Tom的。" },
      { id: 6, question: "Where is the hospital?", options: ["A. Turn right at the first corner.", "B. Turn left at the second corner.", "C. Go straight."], correct: "A", transcript: "Turn right at the first question.", analysis: "在医院右边拐弯。" },
      { id: 7, question: "What's Nancy's favorite color?", options: ["A. Blue.", "B. White.", "C. Pink."], correct: "C", transcript: "What's your favorite color, Nancy?", analysis: "Nancy最喜欢粉色。" },
      { id: 8, question: "What should you say when someone helps you?", options: ["A. Thank you.", "B. You're welcome.", "C. Sorry."], correct: "A", transcript: "Thank you for helping me.", analysis: "应该说'谢谢'。" },
      { id: 9, question: "How often does Sandy go swimming?", options: ["A. Every day.", "B. Twice a week.", "C. Every week."], correct: "B", transcript: "How often do you go swimming? Twice a week.", analysis: "Sandy每周游泳两次。" },
      { id: 10, question: "Where does Kevin want to live in the future?", options: ["A. In a big city.", "B. By the sea.", "C. In the countryside."], correct: "A", transcript: "Where are you going to live in the future?", analysis: "Kevin想住在大城市。" },
      { id: 11, question: "What does Dave's new house look like?", options: ["A. Big and beautiful.", "B. Small but cozy.", "C. Old and small."], correct: "A", transcript: "What does your new house look like?", analysis: "Dave的新房子又大又漂亮。" },
      { id: 12, question: "How does Dave improve his English?", options: ["A. By reading more.", "B. By watching English movies.", "C. By practicing speaking."], correct: "A", transcript: "How do you improve your English?", analysis: "Dave通过阅读提高英语。" },
      { id: 13, question: "Why does Steve look tired?", options: ["A. He didn't sleep well.", "B. He worked too hard.", "C. He was sick."], correct: "A", transcript: "I didn't sleep well last night. Now I have a terrible headache.", analysis: "Steve因为没睡好所以看起来很累。" },
      { id: 14, question: "What do Chinese people do on Dragon Boat Festival?", options: ["A. Watch races and make zongzi.", "B. Eat mooncakes.", "C. Visit relatives."], correct: "A", transcript: "We often watch dragon boat races and make zongzi.", analysis: "中国人看龙舟赛和包粽子。" },
      { id: 15, question: "Why did the girl stay at home?", options: ["A. It was raining heavily.", "B. She was sick.", "C. She had no time."], correct: "A", transcript: "It's raining cats and dogs, so we all stay at home.", analysis: "因为下大雨所以待在家里。" },
    ],
  },
  {
    id: '2025-chongqing',
    year: '2025',
    title: '2025年重庆市初中学业水平暨高中招生考试',
    region: '重庆卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E9%87%8D%E5%BA%86%E5%8D%B7.mp3`,
    transcript: `2025年重庆市初中学业水平暨高中招生考试英语听力测试。

第一节听一遍，根据你所听到的句子，从ABC3个选项中选出最恰当的答语。

1. Good morning, boys and girls.
2. Don't run in the hall, please.
3. Can you help me with the box?
4. I'm sorry I broke your pencil.
5. What about going to a movie this afternoon?

第二节听一遍，根据你所听到的对话和问题，从ABC3个选项中选出正确答案。

第三节听两遍，根据你所听到的长对话，从ABC3个选项中选出正确答案。`,
    questions: [
      { id: 1, question: "What should you say in the morning?", options: ["A. Good morning.", "B. Good afternoon.", "C. Good evening."], correct: "A", transcript: "Good morning, boys and girls.", analysis: "早上应该打招呼说'早上好'。" },
      { id: 2, question: "What should you not do in the hall?", options: ["A. Run.", "B. Walk.", "C. Stand."], correct: "A", transcript: "Don't run in the hall, please.", analysis: "不要在走廊里跑。" },
      { id: 3, question: "What does the person ask?", options: ["A. Help with the box.", "B. Carry the bag.", "C. Open the door."], correct: "A", transcript: "Can you help me with the box?", analysis: "请求帮助搬箱子。" },
      { id: 4, question: "What did the boy do?", options: ["A. Broke the pencil.", "B. Lost the book.", "C. Forgot the homework."], correct: "A", transcript: "I'm sorry I broke your pencil.", analysis: "男孩道歉弄断了铅笔。" },
      { id: 5, question: "What do they plan to do?", options: ["A. Go to a movie.", "B. Go shopping.", "C. Stay at home."], correct: "A", transcript: "What about going to a movie this afternoon?", analysis: "他们计划下午去看电影。" },
      { id: 6, question: "What does the girl say about the dress?", options: ["A. You look cool.", "B. It looks nice.", "C. It's too small."], correct: "A", transcript: "You look so good in the dress.", analysis: "女孩说穿上裙子很好看。" },
      { id: 7, question: "What is the word on Bob's bag?", options: ["A. Journey.", "B. Start.", "C. Dream."], correct: "A", transcript: "It's journey. Every journey begins with the first step.", analysis: "包上的字是'旅程'。" },
      { id: 8, question: "What is Linda's favorite color?", options: ["A. Red.", "B. Blue.", "C. Green."], correct: "A", transcript: "What color do you like best? Red, of course.", analysis: "Linda最喜欢红色。" },
      { id: 9, question: "Where does the woman want to go?", options: ["A. The bank.", "B. The supermarket.", "C. The hospital."], correct: "A", transcript: "Can you tell me the way to the bank?", analysis: "女士想去银行。" },
      { id: 10, question: "Who always comes first?", options: ["A. Lucy.", "B. Mary.", "C. Lily."], correct: "A", transcript: "It must be Lucy. She always comes first.", analysis: "Lucy总是第一个到。" },
      { id: 11, question: "What did Mike use to be like?", options: ["A. Short.", "B. Tall.", "C. Fat."], correct: "A", transcript: "I used to be short. Now I'm much taller.", analysis: "Mike以前很矮。" },
      { id: 12, question: "When will they leave?", options: ["A. In 15 minutes.", "B. In 10 minutes.", "C. In 5 minutes."], correct: "A", transcript: "Let's leave fifteen minutes later.", analysis: "他们15分钟后出发。" },
      { id: 13, question: "What is the report about?", options: ["A. China helping other countries.", "B. China and science.", "C. China and culture."], correct: "A", transcript: "It tells how China helps other countries.", analysis: "报告关于中国如何帮助其他国家。" },
      { id: 14, question: "What does China teach other countries?", options: ["A. To grow rice.", "B. To build railways.", "C. Both A and B."], correct: "C", transcript: "We teach them to grow rice, help them build railways.", analysis: "中国教他们种水稻、修建铁路。" },
      { id: 15, question: "How does the girl feel?", options: ["A. Proud.", "B. Surprised.", "C. Worried."], correct: "A", transcript: "I feel so proud.", analysis: "女孩感到很自豪。" },
    ],
  },
  {
    id: '2025-changsha',
    year: '2025',
    title: '2025年长沙市初中学业水平考试',
    region: '长沙卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E9%95%BF%E6%B2%99%E5%8D%B7.mp3`,
    transcript: `2025年长沙市初中学业水平考试英语科听力部分。

第一节听下面5段对话。每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话读两遍。

1. What shall we have for dinner? Dad, beef noodles, they are your favorite food.
2. Sam, you are so good at numbers, you know, I am crazy about math.
3. You don't look well, David. Your face looks a bit red. Yeah, I have a fever.
4. Excuse me, I'm looking for Mister John. Oh, he is now in the meeting room.
5. What a lovely day. Shall we take a walk in the park this afternoon? Why not?

第二节听下面6段对话或独白。`,
    questions: [
      { id: 1, question: "What will they have for dinner?", options: ["A. Beef noodles.", "B. Dumplings.", "C. Rice."], correct: "A", transcript: "Dad, beef noodles, they are your favorite food.", analysis: "晚饭吃牛肉面。" },
      { id: 2, question: "What is Sam good at?", options: ["A. Math.", "B. English.", "C. Science."], correct: "A", transcript: "I am crazy about math.", analysis: "Sam擅长数学。" },
      { id: 3, question: "What's the matter with David?", options: ["A. He has a fever.", "B. He has a cold.", "C. He has a headache."], correct: "A", transcript: "I have a fever.", analysis: "David发烧了。" },
      { id: 4, question: "Where is Mr. John?", options: ["A. In the meeting room.", "B. In his office.", "C. In the classroom."], correct: "A", transcript: "He is now in the meeting room.", analysis: "John先生在会议室。" },
      { id: 5, question: "What do they plan to do?", options: ["A. Take a walk in the park.", "B. Go shopping.", "C. Stay at home."], correct: "A", transcript: "Shall we take a walk in the park this afternoon?", analysis: "他们计划下午去公园散步。" },
      { id: 6, question: "How did Sophia spend Saturday evening?", options: ["A. Went to a concert.", "B. Watched TV.", "C. Did homework."], correct: "A", transcript: "I went to a concert with my husband.", analysis: "Sophia去听了音乐会。" },
      { id: 7, question: "Is Sophia a big fan of music?", options: ["A. Not really.", "B. Yes, very much.", "C. She hates music."], correct: "A", transcript: "Not really, but my husband is.", analysis: "Sophia自己不是，但她丈夫是。" },
      { id: 8, question: "How is Steve's football training going?", options: ["A. Pretty good.", "B. Not well.", "C. Just so-so."], correct: "A", transcript: "Pretty good.", analysis: "Steve的足球训练进行得很好。" },
      { id: 9, question: "When does Steve start training?", options: ["A. At 8 o'clock.", "B. At 7 o'clock.", "C. At 9 o'clock."], correct: "A", transcript: "I start at eight every day.", analysis: "Steve每天8点开始训练。" },
      { id: 10, question: "What time is it?", options: ["A. 10 o'clock.", "B. 9 o'clock.", "C. 8 o'clock."], correct: "A", transcript: "It's ten o'clock.", analysis: "现在10点。" },
      { id: 11, question: "What does the girl suggest?", options: ["A. Go to the old people's home.", "B. Go to the park.", "C. Go to the museum."], correct: "A", transcript: "Let's volunteer in the old people's home.", analysis: "女孩建议去养老院。" },
      { id: 12, question: "What do they want to do?", options: ["A. Help people.", "B. Make friends.", "C. Learn skills."], correct: "A", transcript: "We want to help people in need.", analysis: "他们想帮助有需要的人。" },
      { id: 13, question: "Where is the art museum?", options: ["A. Next to the park.", "B. Across from the school.", "C. Behind the bank."], correct: "A", transcript: "The art museum is next to the park.", analysis: "美术馆在公园旁边。" },
      { id: 14, question: "How was the concert?", options: ["A. Wonderful.", "B. Boring.", "C. Just so-so."], correct: "A", transcript: "The concert was wonderful.", analysis: "音乐会非常精彩。" },
      { id: 15, question: "What did the girl do yesterday?", options: ["A. Visited her grandma.", "B. Went to a concert.", "C. Stayed at home."], correct: "A", transcript: "I visited my grandma yesterday.", analysis: "女孩昨天去看望了奶奶。" },
    ],
  },
  {
    id: '2025-shanxi2',
    year: '2025',
    title: '2025年陕西省初中学业水平考试',
    region: '陕西卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E9%99%95%E8%A5%BF%E5%8D%B7.mp3`,
    transcript: `2025年陕西省初中学业水平考试英语听力部分。

第一大题听选答案。第一节听下面十段对话，每段对话后有一个问题读二遍。请根据每段对话的内容和后面的问题，从所给的三个选项中选出问题的正确答案。

1. Peter, please take it easy in this exam. Thank you. Miss? Question: What does Miss ask the boy to do?
2. Your handwriting is so nice. Thanks, Miss. Question: How is the boy's handwriting?
3. Hi, Li Fei, you look stronger than before. How did you do that? By swimming? Question: How did the man get stronger?
4. Can I go for a picnic with my friends in the park? Dad? Sure, you'd better come back early. Question: Where will the girl have a picnic?
5. Good evening, sir. May I take your order? I'd like some dumplings, please. Question: What does the man want to order?`,
    questions: [
      { id: 1, question: "What does Miss ask Peter to do?", options: ["A. Take it easy.", "B. Work harder.", "C. Be quiet."], correct: "A", transcript: "Please take it easy in this exam.", analysis: "老师让Peter放松。" },
      { id: 2, question: "How is the boy's handwriting?", options: ["A. Nice.", "B. Bad.", "C. Just so-so."], correct: "A", transcript: "Your handwriting is so nice.", analysis: "男孩的书法很好。" },
      { id: 3, question: "How did the man get stronger?", options: ["A. By swimming.", "B. By running.", "C. By eating more."], correct: "A", transcript: "How did you do that? By swimming?", analysis: "通过游泳变强壮。" },
      { id: 4, question: "Where will the girl have a picnic?", options: ["A. In the park.", "B. At home.", "C. At school."], correct: "A", transcript: "Can I go for a picnic with my friends in the park?", analysis: "女孩将在公园野餐。" },
      { id: 5, question: "What does the man want to order?", options: ["A. Dumplings.", "B. Noodles.", "C. Rice."], correct: "A", transcript: "I'd like some dumplings, please.", analysis: "男士想点饺子。" },
      { id: 6, question: "How do the two speakers feel?", options: ["A. Happy.", "B. Sad.", "C. Angry."], correct: "A", transcript: "What a fine day. It makes me happy. Me too.", analysis: "两人感到开心。" },
      { id: 7, question: "How much did the man pay?", options: ["A. Twenty.", "B. Fifteen.", "C. Ten."], correct: "A", transcript: "I only paid twenty.", analysis: "男士只付了20元。" },
      { id: 8, question: "What did the woman buy?", options: ["A. A scarf.", "B. A hat.", "C. A jacket."], correct: "A", transcript: "You look cool in this cap.", analysis: "女人买了围巾。" },
      { id: 9, question: "What does the man think of the music?", options: ["A. It's relaxing.", "B. It's boring.", "C. It's too loud."], correct: "A", transcript: "I think classic music is relaxing.", analysis: "男士认为古典音乐令人放松。" },
      { id: 10, question: "Why did the girl apologize?", options: ["A. She was late.", "B. She made a mistake.", "C. She broke something."], correct: "A", transcript: "I'm sorry I'm late.", analysis: "女孩因为迟到道歉。" },
      { id: 11, question: "What did the teacher ask the boy to do?", options: ["A. Take it easy.", "B. Come early.", "C. Study harder."], correct: "A", transcript: "Please take it easy in this exam.", analysis: "老师让男孩考试时放松。" },
      { id: 12, question: "What color is the hat?", options: ["A. Blue.", "B. Red.", "C. White."], correct: "A", transcript: "The blue jacket fits you very well.", analysis: "帽子是蓝色的。" },
      { id: 13, question: "What did the doctor advise?", options: ["A. Lose weight.", "B. Eat more.", "C. Sleep more."], correct: "A", transcript: "My doctor advised me to lose some weight.", analysis: "医生建议减肥。" },
      { id: 14, question: "What does the girl want to be?", options: ["A. A nurse.", "B. A doctor.", "C. A teacher."], correct: "A", transcript: "The girl wants to be a nurse.", analysis: "女孩想成为护士。" },
      { id: 15, question: "How does the boy go to school?", options: ["A. By bus.", "B. On foot.", "C. By bike."], correct: "A", transcript: "I often go to school by bus.", analysis: "男孩经常乘公交车上学。" },
    ],
  },
];