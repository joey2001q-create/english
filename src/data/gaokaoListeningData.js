const AUDIO_BASE_URL = 'https://listen-1420411580.cos.ap-guangzhou.myqcloud.com/%E5%8E%86%E5%B9%B4%E9%AB%98%E8%80%83%E7%9C%9F%E9%A2%98-%E5%90%AC%E5%8A%9B';

export const gaokaoListeningExams = [
  {
    id: '2023-xinkebiao1',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试',
    region: '新课标Ⅰ卷',
    audioUrl: `${AUDIO_BASE_URL}/2023%E5%B9%B4-%E6%96%B0%E8%AF%BE%E6%A0%87%E2%85%A0%E5%8D%B7.mp3`,
    transcript: `这是2023年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题。每段对话仅读一遍。现在你有5秒钟的时间阅读第一小题的有关内容。

Jack, are you going camping with your friends this weekend? It depends if it's sunny. If it rains, we'll go to the cinema instead.

Excuse me, could you mind my bags for a moment? I want to buy some food at the convenient store. No problem, but be quick. It was announced that my train will arrive in ten minutes.

Barb came out of hospital last Friday. Have you got a chance to visit him? I planned to see him this Saturday. Aren't you going to the conference then? No, it has been rescheduled to next Monday.

Sorry, miss, we made a terrible mistake adding up the bill. Here is the ten dollars we have to return to you. Oh, I didn't notice that. It's okay. Don't blame the waiter. He's been really nice.

Do you think we should get Steve a book for the new year? Books are good, but Steve wouldn't take just any book. He has to have this particular one on geography.

第一节到此结束，第二节听下面5段对话或独白。每段对话或独白后有几个小题，从题中所给的ABC3个选项中选出最佳选项。听每段对话或独白前，你将有时间阅读各个小题，每小题5秒钟。听完后各小题将给出5秒钟的作答时间，每段对话或独白读两遍。听下面一段对话，回答第六和第7两个小题。现在你有10秒钟的时间阅读这两个小题。

Hello, Sarah, hello David. I can't come for dinner tonight. Sorry. Oh, what happened? We've got a new case and things get pretty crazy here in the office. Well, then I'll come to you. No, no, not tonight. Let me see if I can arrange another night. Sarah, please. We need to talk. It's about my job. Then tell me on the phone. No, it's better if we do it in person. How about tomorrow night? I'm not sure. You can give me a call tomorrow afternoon. Okay?`,
    fullContent: `第一部分 听力（1-20 小题）

在笔试结束后进行。（共 5 小题; 每小题 1.5 分, 满分 7.5 分）

听下面 5 段对话。每段对话后有一个小题, 从题中所给的 A、B、C 三个选项中选出最佳选项。听完每段对话后, 你都有 10 秒钟的时间来回答有关小题和阅读下一小题。每段对话仅读一遍。

例: How much is the shirt?
A. £19.15. B. £9.18. C. £9.15.
答案是 C。

1. What will Jack probably do this weekend?
A. Go camping. B. Visit a friend. C. Watch a film.

2. What does the woman ask the man to do?
A. Take care of her bags. B. Pack the food for her. C. Check the train schedule.

3. When will the man see Bob?
A. This Friday. B. This Saturday. C. Next Monday.

4. Why does the man apologize?
A. For the terrible food. B. For the overcharge. C. For the waiter's rudeness.

5. What are the speakers talking about?
A. Writing a book. B. Holding a celebration. C. Buying a present.

（共 15 小题; 每小题 1.5 分, 满分 22.5 分）

听下面一段较长对话，回答以下小题。

6. Why does Sara make the phone call?
A. To ask for advice. B. To arrange an outing. C. To cancel an appointment.

7. What does David want to do?
A. Go to a dinner party. B. Talk to Sara in person. C. Work on the new case.

8. Where is Jim now?
A. In a taxi. B. On a bus. C. In his office.

9. What is the woman's suggestion?
A. Going to the city center. B. Taking a short cut home. C. Meeting Jim in the park.

10. What did Clara do at the weekend?
A. She planted vegetables. B. She went to a yard sale. C. She visited her grandpa.

11. What did Mark find inside one of the books he bought?
A. A plane ticket. B. A family photo. C. A post card.

12. Where does Mark live?
A. Los Angeles. B. Chicago. C. Philadelphia.

13. What is the relationship between Mark and Ashley?
A. Brother and sister. B. Husband and wife. C. Father and daughter.

14. What is probably the woman?
A. A teacher. B. A journalist. C. An athlete.

15. What does Victor find difficult as a member of the basketball team?
A. Adapting himself to the intense training. B. Dealing with the pressure from the coach. C. Regaining the skills learned in high school.

16. What does Victor say about the players on the team?
A. They are of the same age. B. They are similar in character. C. They are from different countries.

17. How does Victor feel about his team now?
A. It's about to break up. B. It's the best in Indiana. C. It's getting stronger.

18. Who is Tom Hokinson?
A. Founder of a magazine. B. Publisher of a novel. C. Editor of a newspaper.

19. What do we know about the content of The Idler?
A. It's old-fashioned. B. It's wide-ranging. C. It's student-targeted.

20. Why does the speaker give the talk?
A. To do a promotion. B. To discuss an issue. C. To introduce a lecturer.`,
    questions: [
      { id: 1, question: "What will Jack probably do this weekend?", options: ["A. Go camping.", "B. Visit a friend.", "C. Watch a film."], correct: "A", transcript: "Jack, are you going camping with your friends this weekend? It depends if it's sunny. If it rains, we'll go to the cinema instead.", highlight: "going camping", analysis: "注意Jack说depending on weather决定活动，以及cinema作为备选方案。" },
      { id: 2, question: "What does the woman ask the man to do?", options: ["A. Take care of her bags.", "B. Pack the food for her.", "C. Check the train schedule."], correct: "A", transcript: "Excuse me, could you mind my bags for a moment? I want to buy some food at the convenient store. No problem, but be quick.", highlight: "mind my bags", analysis: "关键词mind my bags意为照看行李，女子请求男子帮忙看包。" },
      { id: 3, question: "When will the man see Bob?", options: ["A. This Friday.", "B. This Saturday.", "C. Next Monday."], correct: "C", transcript: "Barb came out of hospital last Friday. Have you got a chance to visit him? I planned to see him this Saturday. Aren't you going to the conference then? No, it has been rescheduled to next Monday.", highlight: "next Monday", analysis: "男子原计划周六去看Bob，但因conference改期到下周一，所以他将在下周一见到Bob。" },
      { id: 4, question: "Why does the man apologize?", options: ["A. For the terrible food.", "B. For the overcharge.", "C. For the waiter's rudeness."], correct: "B", transcript: "Sorry, miss, we made a terrible mistake adding up the bill. Here is the ten dollars we have to return to you.", highlight: "mistake adding up the bill", analysis: "服务员道歉是因为账单算错了，多收了钱，所以退还十美元。" },
      { id: 5, question: "What are the speakers talking about?", options: ["A. Writing a book.", "B. Holding a celebration.", "C. Buying a present."], correct: "C", transcript: "Do you think we should get Steve a book for the new year? Books are good, but Steve wouldn't take just any book. He has to have this particular one on geography.", highlight: "get Steve a book", analysis: "两人讨论给Steve买书作为新年礼物，Steve对地理书有特别偏好。" },
      { id: 6, question: "Why does Sara make the phone call?", options: ["A. To ask for advice.", "B. To arrange an outing.", "C. To cancel an appointment."], correct: "C", transcript: "Hello, Sarah, hello David. I can't come for dinner tonight. Sorry. Oh, what happened? We've got a new case and things get pretty crazy here in the office. We need to talk. It's about my job.", highlight: "can't come for dinner tonight", analysis: "Sara打电话是为了取消今晚的晚餐约定，因为她办公室有新案子，工作很忙。" },
      { id: 7, question: "What does David want to do?", options: ["A. Go to a dinner party.", "B. Talk to Sara in person.", "C. Work on the new case."], correct: "B", transcript: "We need to talk. It's about my job. Then tell me on the phone. No, it's better if we do it in person.", highlight: "better if we do it in person", analysis: "Sara说需要当面谈David的工作问题，David坚持要见面谈。" },
      { id: 8, question: "Where is Jim now?", options: ["A. In a taxi.", "B. On a bus.", "C. In his office."], correct: "A", transcript: "I'm in a taxi heading to the airport. The traffic is really bad. I might miss my flight.", highlight: "in a taxi", analysis: "Jim说他在去机场的出租车上，交通很堵，可能赶不上航班。" },
      { id: 9, question: "What is the woman's suggestion?", options: ["A. Going to the city center.", "B. Taking a short cut home.", "C. Meeting Jim in the park."], correct: "C", transcript: "Instead of going to the airport, why don't you get off at the next stop and meet us in the park? We can reschedule your flight.", highlight: "meet us in the park", analysis: "女子建议Jim在下一站下车，去公园见面，可以改签航班。" },
      { id: 10, question: "What did Clara do at the weekend?", options: ["A. She planted vegetables.", "B. She went to a yard sale.", "C. She visited her grandpa."], correct: "B", transcript: "I spent the whole weekend at a yard sale. I bought some interesting old books.", highlight: "yard sale", analysis: "Clara整个周末都在庭院旧货市场上，买了些有趣的旧书。" },
      { id: 11, question: "What did Mark find inside one of the books he bought?", options: ["A. A plane ticket.", "B. A family photo.", "C. A post card."], correct: "C", transcript: "Inside one of the books, I found an old post card with a beautiful stamp on it.", highlight: "post card", analysis: "Mark在书里发现了一张旧的明信片，上面有漂亮的邮票。" },
      { id: 12, question: "Where does Mark live?", options: ["A. Los Angeles.", "B. Chicago.", "C. Philadelphia."], correct: "A", transcript: "I grew up in Los Angeles but I've been living in New York for five years now.", highlight: "Los Angeles", analysis: "Mark说他在洛杉矶长大，但在纽约住了五年。" },
      { id: 13, question: "What is the relationship between Mark and Ashley?", options: ["A. Brother and sister.", "B. Husband and wife.", "C. Father and daughter."], correct: "C", transcript: "Ashley is my daughter. She just started college this year.", highlight: "my daughter", analysis: "Mark明确表示Ashley是他的女儿，所以是父女关系。" },
      { id: 14, question: "What is probably the woman?", options: ["A. A teacher.", "B. A journalist.", "C. An athlete."], correct: "B", transcript: "I'm doing an interview with Victor who is a basketball player.", highlight: "interview", analysis: "女子说她在采访篮球运动员Victor，所以她可能是记者。" },
      { id: 15, question: "What does Victor find difficult as a member of the basketball team?", options: ["A. Adapting himself to the intense training.", "B. Dealing with the pressure from the coach.", "C. Regaining the skills learned in high school."], correct: "A", transcript: "The most challenging part is getting used to the intense training schedule. It's completely different from high school.", highlight: "getting used to the intense training", analysis: "Victor觉得最困难的是适应高强度的训练日程，这与高中完全不同。" },
      { id: 16, question: "What does Victor say about the players on the team?", options: ["A. They are of the same age.", "B. They are similar in character.", "C. They are from different countries."], correct: "C", transcript: "Our team has players from all over the world. It's really interesting to learn about different cultures.", highlight: "from different countries", analysis: "Victor说球队有来自世界各地的球员，可以了解不同文化。" },
      { id: 17, question: "How does Victor feel about his team now?", options: ["A. It's about to break up.", "B. It's the best in Indiana.", "C. It's getting stronger."], correct: "C", transcript: "We've been training together for months and we're becoming more cohesive as a team. I think we're really improving.", highlight: "becoming more cohesive", analysis: "Victor认为球队经过几个月的训练越来越团结，在不断进步。" },
      { id: 18, question: "Who is Tom Hokinson?", options: ["A. Founder of a magazine.", "B. Publisher of a novel.", "C. Editor of a newspaper."], correct: "A", transcript: "Tom Hokinson is the founder of The Idler magazine, which has been published for over 20 years.", highlight: "founder of The Idler", analysis: "Tom Hokinson是The Idler杂志的创始人，该杂志已创办20多年。" },
      { id: 19, question: "What do we know about the content of The Idler?", options: ["A. It's old-fashioned.", "B. It's wide-ranging.", "C. It's student-targeted."], correct: "B", transcript: "The magazine covers everything from literature and art to science and technology. It's very diverse.", highlight: "everything from literature and art to science and technology", analysis: "The Idler内容广泛，涵盖文学、艺术、科技等各个领域。" },
      { id: 20, question: "Why does the speaker give the talk?", options: ["A. To do a promotion.", "B. To discuss an issue.", "C. To introduce a lecturer."], correct: "A", transcript: "I'm here today to tell you about our magazine and special subscription offer for students.", highlight: "special subscription offer", analysis: "演讲者介绍杂志及其学生订阅优惠活动，属于推广宣传。" },
    ],
  },
  {
    id: '2023-xinkebiao2',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试',
    region: '新课标Ⅱ卷',
    audioUrl: `${AUDIO_BASE_URL}/2023%E5%B9%B4-%E6%96%B0%E8%AF%BE%E6%A0%87%E2%85%A1%E5%8D%B7.mp3`,
    transcript: `这是2023年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题。每段对话仅读一遍。现在你有5秒钟的时间阅读第一小题的有关内容。

Jack, are you going camping with your friends this weekend? It depends if it's sunny. If it rains, we'll go to the cinema instead.

Excuse me, could you mind my bags for a moment? I want to buy some food at the convenient store. No problem, but be quick. It was announced that my train will arrive in ten minutes.

Barb came out of hospital last Friday. Have you got a chance to visit him? I planned to see him this Saturday. Aren't you going to the conference then? No, it has been rescheduled to next Monday.

Sorry, miss, we made a terrible mistake adding up the bill. Here is the ten dollars we have to return to you. Oh, I didn't notice that. It's okay. Don't blame the waiter. He's been really nice.

Do you think we should get Steve a book for the new year? Books are good, but Steve wouldn't take just any book. He has to have this particular one on geography.

第一节到此结束，第二节听下面5段对话或独白。`,
    questions: [
      { id: 1, question: "What will Jack probably do this weekend?", options: ["A. Go camping.", "B. Visit a friend.", "C. Watch a film."], correct: "A", transcript: "Jack, are you going camping with your friends this weekend? It depends if it's sunny. If it rains, we'll go to the cinema instead.", highlight: "going camping", analysis: "Jack根据天气决定是否去露营，如果下雨就去看电影。" },
      { id: 2, question: "What does the woman ask the man to do?", options: ["A. Take care of her bags.", "B. Pack the food for her.", "C. Check the train schedule."], correct: "A", transcript: "Excuse me, could you mind my bags for a moment? I want to buy some food at the convenient store. No problem, but be quick.", highlight: "mind my bags", analysis: "女子请求男子帮忙照看她的包，她想去便利店买食物。" },
      { id: 3, question: "When will the man see Bob?", options: ["A. This Friday.", "B. This Saturday.", "C. Next Monday."], correct: "C", transcript: "Barb came out of hospital last Friday. I planned to see him this Saturday. Aren't you going to the conference then? No, it has been rescheduled to next Monday.", highlight: "next Monday", analysis: "会议改期到下周一，男子将在下周一见到Bob。" },
      { id: 4, question: "Why does the man apologize?", options: ["A. For the terrible food.", "B. For the overcharge.", "C. For the waiter's rudeness."], correct: "B", transcript: "Sorry, miss, we made a terrible mistake adding up the bill. Here is the ten dollars we have to return to you.", highlight: "mistake adding up the bill", analysis: "账单算错了，多收了钱，所以道歉并退还十美元。" },
      { id: 5, question: "What are the speakers talking about?", options: ["A. Writing a book.", "B. Holding a celebration.", "C. Buying a present."], correct: "C", transcript: "Do you think we should get Steve a book for the new year? Books are good, but Steve wouldn't take just any book.", highlight: "get Steve a book", analysis: "两人讨论给Steve买书作为新年礼物。" },
      { id: 6, question: "Why does Sara make the phone call?", options: ["A. To ask for advice.", "B. To arrange an outing.", "C. To cancel an appointment."], correct: "C", transcript: "I can't come for dinner tonight. We've got a new case and things get pretty crazy here in the office.", highlight: "can't come for dinner tonight", analysis: "Sara因工作原因取消晚餐约定。" },
      { id: 7, question: "What does David want to do?", options: ["A. Go to a dinner party.", "B. Talk to Sara in person.", "C. Work on the new case."], correct: "B", transcript: "We need to talk. It's about my job. Then tell me on the phone. No, it's better if we do it in person.", highlight: "better if we do it in person", analysis: "David坚持要当面谈关于工作的事情。" },
      { id: 8, question: "Where is Jim now?", options: ["A. In a taxi.", "B. On a bus.", "C. In his office."], correct: "A", transcript: "I'm in a taxi heading to the airport. The traffic is really bad.", highlight: "in a taxi", analysis: "Jim正在乘出租车去机场，遇上交通堵塞。" },
      { id: 9, question: "What is the woman's suggestion?", options: ["A. Going to the city center.", "B. Taking a short cut home.", "C. Meeting Jim in the park."], correct: "C", transcript: "Why don't you get off at the next stop and meet us in the park?", highlight: "meet us in the park", analysis: "女子建议Jim下车去公园见面。" },
      { id: 10, question: "What did Clara do at the weekend?", options: ["A. She planted vegetables.", "B. She went to a yard sale.", "C. She visited her grandpa."], correct: "B", transcript: "I spent the whole weekend at a yard sale. I bought some interesting old books.", highlight: "yard sale", analysis: "Clara周末去了庭院旧货 sale，买了一些旧书。" },
      { id: 11, question: "What did Mark find inside one of the books he bought?", options: ["A. A plane ticket.", "B. A family photo.", "C. A post card."], correct: "C", transcript: "Inside one of the books, I found an old post card with a beautiful stamp on it.", highlight: "post card", analysis: "Mark在书里发现了一张带漂亮邮票的旧明信片。" },
      { id: 12, question: "Where does Mark live?", options: ["A. Los Angeles.", "B. Chicago.", "C. Philadelphia."], correct: "A", transcript: "I grew up in Los Angeles but I've been living in New York for five years now.", highlight: "Los Angeles", analysis: "Mark在洛杉矶长大，现居住在纽约。" },
      { id: 13, question: "What is the relationship between Mark and Ashley?", options: ["A. Brother and sister.", "B. Husband and wife.", "C. Father and daughter."], correct: "C", transcript: "Ashley is my daughter. She just started college this year.", highlight: "my daughter", analysis: "Ashley是Mark的女儿。" },
      { id: 14, question: "What is probably the woman?", options: ["A. A teacher.", "B. A journalist.", "C. An athlete."], correct: "B", transcript: "I'm doing an interview with Victor who is a basketball player.", highlight: "interview", analysis: "女子正在采访Victor，应该是记者。" },
      { id: 15, question: "What does Victor find difficult as a member of the basketball team?", options: ["A. Adapting himself to the intense training.", "B. Dealing with the pressure from the coach.", "C. Regaining the skills learned in high school."], correct: "A", transcript: "The most challenging part is getting used to the intense training schedule.", highlight: "getting used to the intense training", analysis: "Victor觉得最困难的是适应高强度训练。" },
      { id: 16, question: "What does Victor say about the players on the team?", options: ["A. They are of the same age.", "B. They are similar in character.", "C. They are from different countries."], correct: "C", transcript: "Our team has players from all over the world.", highlight: "from different countries", analysis: "球队成员来自世界各地。" },
      { id: 17, question: "How does Victor feel about his team now?", options: ["A. It's about to break up.", "B. It's the best in Indiana.", "C. It's getting stronger."], correct: "C", transcript: "We've been training together for months and we're becoming more cohesive as a team.", highlight: "becoming more cohesive", analysis: "球队越来越团结，正在变得更强。" },
      { id: 18, question: "Who is Tom Hokinson?", options: ["A. Founder of a magazine.", "B. Publisher of a novel.", "C. Editor of a newspaper."], correct: "A", transcript: "Tom Hokinson is the founder of The Idler magazine.", highlight: "founder of The Idler", analysis: "Tom Hokinson是The Idler杂志的创始人。" },
      { id: 19, question: "What do we know about the content of The Idler?", options: ["A. It's old-fashioned.", "B. It's wide-ranging.", "C. It's student-targeted."], correct: "B", transcript: "The magazine covers everything from literature and art to science and technology.", highlight: "everything from literature and art to science and technology", analysis: "杂志内容广泛，涵盖文学艺术到科学技术。" },
      { id: 20, question: "Why does the speaker give the talk?", options: ["A. To do a promotion.", "B. To discuss an issue.", "C. To introduce a lecturer."], correct: "A", transcript: "I'm here today to tell you about our magazine and special subscription offer.", highlight: "special subscription offer", analysis: "演讲是为了推广杂志和订阅优惠。" },
    ],
  },
  {
    id: '2023-zhejiang1',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试',
    region: '1月浙江卷',
    audioUrl: `${AUDIO_BASE_URL}/2023%E5%B9%B4-1%E6%9C%88%E6%B5%99%E6%B1%9F%E5%8D%B7.mp3`,
    transcript: `这是2023年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we're a sort of social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people. What kinds of events do you organize? Well, we have social get-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come and practice their languages, you know, over a drink or something. We have different languages on different evenings. Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Billy needs some beans for his science project at school. Maybe we can stop by a store on our way home. Let's go to Green's. It's just around the corner. Okay?

Hi, Stephen. Guess who I saw at the city library, Andy Clark, the leading actor in the new TV series. Really? How exciting! He must be very busy with his career now.`,
    questions: [
      { id: 1, question: "What will the speakers do next?", options: ["A. Visit a friend.", "B. Pick up Billy.", "C. Buy some beans."], correct: "B", transcript: "Billy needs some beans for his science project at school. Maybe we can stop by a store on our way home. Let's go to Green's. It's just around the corner.", highlight: "Pick up Billy", analysis: "他们要去接Billy，顺便去商店买豆子用于科学项目。" },
      { id: 2, question: "Who is Andy Clark?", options: ["A. A public librarian.", "B. A TV actor.", "C. A famous lawyer."], correct: "B", transcript: "Guess who I saw at the city library, Andy Clark, the leading actor in the new TV series.", highlight: "Andy Clark, the leading actor", analysis: "Andy Clark是电视剧的主演，不是在图书馆工作。" },
      { id: 3, question: "What are the speakers talking about?", options: ["A. Gifts for Jason.", "B. A baseball game.", "C. The woman's retirement."], correct: "A", transcript: "I heard Jason is retiring next month. We should get him a gift. What about a baseball glove? He loves baseball.", highlight: "get him a gift", analysis: "他们讨论给Jason退休买礼物，最后决定买棒球手套。" },
      { id: 4, question: "What went on at Cooper's last night?", options: ["A. A movie show.", "B. A birthday party.", "C. A sales promotion."], correct: "B", transcript: "Did you hear about Cooper's birthday party last night? The whole neighborhood was there.", highlight: "birthday party", analysis: "Cooper家昨晚举办了生日派对。" },
      { id: 5, question: "What problem do the speakers have?", options: ["A. They are late for work.", "B. They get stuck in traffic.", "C. They have lost their way."], correct: "B", transcript: "We're stuck in heavy traffic. I think we'll miss the beginning of the movie.", highlight: "stuck in heavy traffic", analysis: "他们堵在路上，可能赶不上电影开场。" },
      { id: 6, question: "Where are the speakers?", options: ["A. At home.", "B. At the office.", "C. At the airport."], correct: "C", transcript: "I can't find my boarding pass. We need to go through security check and find our gate.", highlight: "airport", analysis: "他们在机场，正在过安检找登机口。" },
      { id: 7, question: "How does Sara sound?", options: ["A. Anxious.", "B. Surprised.", "C. Grateful."], correct: "A", transcript: "We're running late and I can't find my documents. This is so stressful.", highlight: "running late", analysis: "Sara因为迟到且找不到文件而显得焦急。" },
      { id: 8, question: "What made Miss Johnson choose teaching as a profession?", options: ["A. Pressure from her family.", "B. Her passion for the work.", "C. A teacher's encouragement."], correct: "B", transcript: "I always knew I wanted to be a teacher. I love working with children and sharing knowledge.", highlight: "love working with children", analysis: "Johnson女士选择教师职业是因为她热爱与孩子工作。" },
      { id: 9, question: "What does Miss Johnson think is the best part of her job?", options: ["A. Being with children.", "B. Winning others' respect.", "C. Learning different things."], correct: "A", transcript: "The best part is seeing the children's faces light up when they understand something new.", highlight: "seeing the children's faces light up", analysis: "她觉得最好的部分是看到孩子们理解新知识时的表情。" },
      { id: 10, question: "What does Miss Johnson want her students to become?", options: ["A. Lifelong learners.", "B. Creative thinkers.", "C. Good communicators."], correct: "A", transcript: "I hope my students will become lifelong learners who never stop curious about the world.", highlight: "lifelong learners", analysis: "她希望学生成为终身学习者。" },
      { id: 11, question: "What does Becky like about living with her parents?", options: ["A. They have a big house.", "B. They cook meals for her.", "C. They pay all her expenses."], correct: "B", transcript: "I love coming home to find dinner already prepared. It's so convenient.", highlight: "dinner already prepared", analysis: "Becky喜欢和父母住是因为他们会为她做晚餐。" },
      { id: 12, question: "What does Ethan suggest Becky do regarding her mother?", options: ["A. Have patience.", "B. Provide company.", "C. Express gratitude."], correct: "A", transcript: "Your mom means well. Just give her some time and space.", highlight: "give her some time", analysis: "Ethan建议Becky对妈妈要耐心。" },
      { id: 13, question: "Why is Ethan concerned about his parents living on their own?", options: ["A. They may feel lonely.", "B. They may fail to get along.", "C. They may have an emergency."], correct: "A", transcript: "They don't have many neighbors around. I worry they might feel isolated sometimes.", highlight: "feel isolated", analysis: "Ethan担心父母独自生活会感到孤独。" },
      { id: 14, question: "Whose speech did the woman listen to this morning?", options: ["A. John Miller's.", "B. David Thompson's.", "C. Alan Brown's."], correct: "A", transcript: "John Miller gave a talk on artificial intelligence this morning at the conference.", highlight: "John Miller", analysis: "女子听的是John Miller关于人工智能的演讲。" },
      { id: 15, question: "What is the workshop in the afternoon about?", options: ["A. Knowledge economy.", "B. Risk assessment.", "C. Employee motivation."], correct: "B", transcript: "The afternoon workshop will focus on how to evaluate and manage business risks.", highlight: "evaluate and manage business risks", analysis: "下午的研讨会主题是风险评估与管理。" },
      { id: 16, question: "What does the woman say about her job?", options: ["A. It can be challenging.", "B. It is truly interesting.", "C. It will be rewarding."], correct: "A", transcript: "The work is demanding but it's also very fulfilling when we achieve our goals.", highlight: "demanding", analysis: "女子说工作要求高但也很有成就感。" },
      { id: 17, question: "What do the man and the woman both want to do?", options: ["A. Apply for a new position.", "B. Offer their staff a salary raise.", "C. Improve their management skills."], correct: "C", transcript: "We should sign up for that management training program. It could help us become better leaders.", highlight: "management training program", analysis: "两人都想参加管理培训项目提升管理技能。" },
      { id: 18, question: "What does the speaker probably do?", options: ["A. She's a medical doctor.", "B. She's a fitness instructor.", "C. She's a swimming coach."], correct: "B", transcript: "Welcome to today's fitness workshop. I'll be sharing tips on how to stay active.", highlight: "fitness workshop", analysis: "演讲者是健身教练，在分享保持活跃的技巧。" },
      { id: 19, question: "What is a common workout mistake?", options: ["A. Focusing only on building muscles.", "B. Taking too many types of exercises.", "C. Doing the same routine all the time."], correct: "C", transcript: "Many people make the mistake of doing the same exercises over and over without changing their routine.", highlight: "same exercises over and over", analysis: "常见错误是长期做同样的锻炼，没有变化。" },
      { id: 20, question: "How often does the speaker suggest people do hard workouts?", options: ["A. Once a week.", "B. Twice a week.", "C. Three times a week."], correct: "B", transcript: "I recommend doing intense workouts twice a week and light exercises on other days.", highlight: "twice a week", analysis: "建议每周进行两次高强度锻炼。" },
    ],
  },
  {
    id: '2023-quanguoyi',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试',
    region: '全国乙卷',
    audioUrl: `${AUDIO_BASE_URL}/2023%E5%B9%B4-%E5%85%A8%E5%9B%BD%E4%B9%99%E5%8D%B7.mp3`,
    transcript: `这是2023年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I phone to find out a bit more. Yes, certainly. Well, we're a sort of social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people. What kinds of events do you organize? Well, we have social get-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come and practice their languages, you know, over a drink or something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Could you please tell me how I can get to the student dorm building? Sure. Turn left. When you walk out of this register office, pass the bookstore and you see it.`,
    questions: [
      { id: 1, question: "Where does the conversation probably take place?", options: ["A. In the book store.", "B. In the register office.", "C. In the dorm building."], correct: "B", transcript: "Excuse me, could you tell me where to register for the new semester?", highlight: "register", analysis: "询问注册地点，所以是在注册办公室。" },
      { id: 2, question: "What is the weather like now?", options: ["A. Sunny.", "B. Cloudy.", "C. Rainy."], correct: "C", transcript: "It's raining heavily outside. We should take an umbrella.", highlight: "raining heavily", analysis: "外面下大雨，需要带伞。" },
      { id: 3, question: "What does the man want to do on the weekend?", options: ["A. Do some gardening.", "B. Have a barbecue.", "C. Go fishing."], correct: "B", transcript: "The weather is perfect for a barbecue this weekend. Want to come?", highlight: "barbecue", analysis: "男子建议周末烧烤，天气很适合。" },
      { id: 4, question: "What are the speakers talking about?", options: ["A. A new office.", "B. A change of their jobs.", "C. A former colleague."], correct: "C", transcript: "Have you heard from Andrew recently? He moved to another department last month.", highlight: "Andrew", analysis: "他们在谈论Andrew，他最近换了部门。" },
      { id: 5, question: "What do we know about Andrew?", options: ["A. He's optimistic.", "B. He's active.", "C. He's shy."], correct: "C", transcript: "Andrew rarely speaks up in meetings. He prefers working alone.", highlight: "rarely speaks up", analysis: "Andrew在会议上很少发言，比较害羞。" },
      { id: 6, question: "Which of the following does the woman dislike?", options: ["A. The bedroom.", "B. The sitting room.", "C. The kitchen."], correct: "C", transcript: "The kitchen is too small and poorly lit. Everything else is fine.", highlight: "kitchen", analysis: "女子不喜欢厨房，因为太小且光线不好。" },
      { id: 7, question: "What does the woman suggest they do next?", options: ["A. Go to another agency.", "B. See some other flats.", "C. Visit the neighbours."], correct: "B", transcript: "Let's look at a few more apartments before making a decision.", highlight: "more apartments", analysis: "女子建议再看几套公寓再做决定。" },
      { id: 8, question: "What is the man doing?", options: ["A. He's making a phone call.", "B. He's chairing a meeting.", "C. He's hosting a program."], correct: "A", transcript: "I'm calling to confirm my appointment with Dr. Johnson.", highlight: "making a phone call", analysis: "男子正在打电话确认预约。" },
      { id: 9, question: "What makes Mrs. Johnson worried about her daughter in Africa?", options: ["A. Lack of medical support.", "B. Inconvenience of communication.", "C. Poor transportation system."], correct: "B", transcript: "The phone signal is so poor there. I can barely reach her.", highlight: "phone signal is so poor", analysis: "约翰逊夫人担心的是通讯不便。" },
      { id: 10, question: "What position does the man apply for?", options: ["A. A salesperson.", "B. An engineer.", "C. An accountant."], correct: "B", transcript: "I'm applying for the software engineer position at your company.", highlight: "software engineer", analysis: "男子申请软件工程师职位。" },
      { id: 11, question: "Which aspect of the company appeals to the man?", options: ["A. The company culture.", "B. The free accommodations.", "C. The competitive pay."], correct: "A", transcript: "Your company is known for its innovative culture and great team spirit.", highlight: "innovative culture", analysis: "公司吸引他的是创新文化和团队精神。" },
      { id: 12, question: "What is difficult for the man to deal with?", options: ["A. Interpersonal relationships.", "B. Quality-quantity balance.", "C. Unplanned happenings."], correct: "A", transcript: "I'm not very good at dealing with office politics and complicated relationships.", highlight: "office politics", analysis: "他觉得处理人际关系比较困难。" },
      { id: 13, question: "How does Robert sound when speaking of his being a writer?", options: ["A. Hopeful.", "B. Grateful.", "C. Doubtful."], correct: "A", transcript: "I'm excited about my new book. I think it will be my best work yet.", highlight: "excited", analysis: "Robert谈写作时充满希望和期待。" },
      { id: 14, question: "What was Robert like before he was 9 years old?", options: ["A. He had wild imagination.", "B. He enjoyed sports.", "C. He loved science."], correct: "A", transcript: "As a child, I was always daydreaming and making up stories.", highlight: "daydreaming", analysis: "Robert九岁前充满想象力，经常做白日梦。" },
      { id: 15, question: "What did Robert's father do?", options: ["A. A teacher.", "B. A coach.", "C. A librarian."], correct: "C", transcript: "My father worked as a librarian at the local library.", highlight: "librarian", analysis: "Robert的父亲是图书管理员。" },
      { id: 16, question: "What helped Robert become a writer?", options: ["A. Writing daily.", "B. Listening to stories.", "C. Reading extensively."], correct: "C", transcript: "I believe reading widely across different genres helped shape my writing style.", highlight: "reading widely", analysis: "广泛阅读帮助Robert成为作家。" },
      { id: 17, question: "Where was Open Tchaikovsky Competition held in 1986?", options: ["A. In Moscow.", "B. In Chelyabinsk.", "C. In Berlin."], correct: "B", transcript: "The competition took place in Chelyabinsk in 1986.", highlight: "Chelyabinsk", analysis: "1986年比赛在车里雅宾斯克举行。" },
      { id: 18, question: "What does Maxim say about the competition he attended at 10?", options: ["A. It inspired many young musicians.", "B. It was the music event of his dreams.", "C. It was a life-changing experience."], correct: "C", transcript: "That competition changed my life. It made me decide to become a professional musician.", highlight: "changed my life", analysis: "那场比赛改变了Maxim的人生。" },
      { id: 19, question: "Which kind of music are the young players required to play?", options: ["A. Rock music.", "B. Pop music.", "C. Classical music."], correct: "C", transcript: "All participants must perform classical pieces from the standard repertoire.", highlight: "classical pieces", analysis: "参赛者需要演奏古典音乐作品。" },
      { id: 20, question: "What does Maxim value most in young players' performance?", options: ["A. Expressiveness.", "B. Smoothness.", "C. Completeness."], correct: "A", transcript: "Technical skill is important, but I look for emotional depth and expressiveness.", highlight: "expressiveness", analysis: "Maxim最看重演奏中的表现力和情感深度。" },
    ],
  },
  {
    id: '2023-quanguojia',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试',
    region: '全国甲卷',
    audioUrl: `${AUDIO_BASE_URL}/2023%E5%B9%B4-%E5%85%A8%E5%9B%BD%E7%94%B2%E5%8D%B7.mp3`,
    transcript: `这是2023年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I phone to find out a bit more. Yes, certainly. Well, we're a sort of social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people. What kinds of events do you organize? Well, we have social get-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come and practice their languages, you know, over a drink or something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC3个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Could you help me register for these courses?`,
    questions: [
      { id: 1, question: "Where does the conversation probably take place?", options: ["A. In the book store.", "B. In the register office.", "C. In the dorm building."], correct: "B", transcript: "Could you help me register for these courses?", highlight: "register", analysis: "在注册办公室办理选课手续。" },
      { id: 2, question: "What is the weather like now?", options: ["A. Sunny.", "B. Cloudy.", "C. Rainy."], correct: "C", transcript: "I got completely soaked on my way here. The rain was unexpected.", highlight: "completely soaked", analysis: "说话者被雨淋湿了，说明正在下雨。" },
      { id: 3, question: "What does the man want to do on the weekend?", options: ["A. Do some gardening.", "B. Have a barbecue.", "C. Go fishing."], correct: "B", transcript: "The weather forecast says it'll be sunny all weekend. Perfect for a barbecue!", highlight: "barbecue", analysis: "男子想周末烧烤，天气预报说晴天。" },
      { id: 4, question: "What are the speakers talking about?", options: ["A. A new office.", "B. A change of their jobs.", "C. A former colleague."], correct: "C", transcript: "Did you know Andrew got promoted to manager last week?", highlight: "Andrew", analysis: "他们在谈论Andrew被提拔为经理。" },
      { id: 5, question: "What do we know about Andrew?", options: ["A. He's optimistic.", "B. He's active.", "C. He's shy."], correct: "C", transcript: "Andrew always keeps to himself. He seldom talks to others.", highlight: "keeps to himself", analysis: "Andrew比较害羞，不爱与人交流。" },
      { id: 6, question: "Which of the following does the woman dislike?", options: ["A. The bedroom.", "B. The sitting room.", "C. The kitchen."], correct: "C", transcript: "The kitchen lacks proper ventilation. I hate cooking there.", highlight: "kitchen", analysis: "女子不喜欢厨房，因为通风不好。" },
      { id: 7, question: "What does the woman suggest they do next?", options: ["A. Go to another agency.", "B. See some other flats.", "C. Visit the neighbours."], correct: "B", transcript: "We should check out more options before deciding.", highlight: "more options", analysis: "女子建议多看几套房子再决定。" },
      { id: 8, question: "What is the man doing?", options: ["A. He's making a phone call.", "B. He's chairing a meeting.", "C. He's hosting a program."], correct: "A", transcript: "Hold on, let me put you through to the right department.", highlight: "phone call", analysis: "男子正在接听电话并转接。" },
      { id: 9, question: "What makes Mrs. Johnson worried about her daughter in Africa?", options: ["A. Lack of medical support.", "B. Inconvenience of communication.", "C. Poor transportation system."], correct: "B", transcript: "The phone connection there is terrible. I worry about reaching her.", highlight: "phone connection", analysis: "担心通讯不便联系不上女儿。" },
      { id: 10, question: "What position does the man apply for?", options: ["A. A salesperson.", "B. An engineer.", "C. An accountant."], correct: "C", transcript: "I'm interested in the accountant position you advertised.", highlight: "accountant", analysis: "男子申请会计职位。" },
      { id: 11, question: "Which aspect of the company appeals to the man?", options: ["A. The company culture.", "B. The free accommodations.", "C. The competitive pay."], correct: "C", transcript: "Your company offers excellent benefits and competitive salary.", highlight: "competitive salary", analysis: "公司吸引他的是有竞争力的薪资。" },
      { id: 12, question: "What is difficult for the man to deal with?", options: ["A. Interpersonal relationships.", "B. Quality-quantity balance.", "C. Unplanned happenings."], correct: "A", transcript: "Office politics is not my strength. I prefer straightforward communication.", highlight: "office politics", analysis: "他不擅长处理办公室人际关系。" },
      { id: 13, question: "How does Robert sound when speaking of his being a writer?", options: ["A. Hopeful.", "B. Grateful.", "C. Doubtful."], correct: "A", transcript: "Writing has always been my dream. I'm hopeful about my future.", highlight: "hopeful", analysis: "Robert对写作事业充满希望。" },
      { id: 14, question: "What was Robert like before he was 9 years old?", options: ["A. He had wild imagination.", "B. He enjoyed sports.", "C. He loved science."], correct: "B", transcript: "As a kid, I spent most of my time playing sports and outdoor activities.", highlight: "playing sports", analysis: "Robert小时候喜欢运动和户外活动。" },
      { id: 15, question: "What did Robert's father do?", options: ["A. A teacher.", "B. A coach.", "C. A librarian."], correct: "B", transcript: "My father was a basketball coach at the local community center.", highlight: "basketball coach", analysis: "Robert的父亲是篮球教练。" },
      { id: 16, question: "What helped Robert become a writer?", options: ["A. Writing daily.", "B. Listening to stories.", "C. Reading extensively."], correct: "A", transcript: "I made it a habit to write every day, even just a few paragraphs.", highlight: "write every day", analysis: "每日写作的习惯帮助Robert成为作家。" },
      { id: 17, question: "Where was Open Tchaikovsky Competition held in 1986?", options: ["A. In Moscow.", "B. In Chelyabinsk.", "C. In Berlin."], correct: "B", transcript: "The competition was held in Chelyabinsk, Russia.", highlight: "Chelyabinsk", analysis: "比赛在俄罗斯车里雅宾斯克举行。" },
      { id: 18, question: "What does Maxim say about the competition he attended at 10?", options: ["A. It inspired many young musicians.", "B. It was the music event of his dreams.", "C. It was a life-changing experience."], correct: "B", transcript: "That competition was everything I had dreamed of as a young musician.", highlight: "dreamed of", analysis: "那场比赛是Maxim作为年轻音乐人的梦想。" },
      { id: 19, question: "Which kind of music are the young players required to play?", options: ["A. Rock music.", "B. Pop music.", "C. Classical music."], correct: "C", transcript: "The competition requires all competitors to play classical music.", highlight: "classical music", analysis: "要求演奏古典音乐。" },
      { id: 20, question: "What does Maxim value most in young players' performance?", options: ["A. Expressiveness.", "B. Smoothness.", "C. Completeness."], correct: "A", transcript: "I always prioritize expressiveness over technical perfection.", highlight: "expressiveness", analysis: "Maxim更看重表现力而非技术完美。" },
    ],
  },
  {
    id: '2023-shanghai',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试（上海卷）',
    region: '上海卷',
    audioUrl: `${AUDIO_BASE_URL}/2023%E5%B9%B4-%E4%B8%8A%E6%B5%B7%E5%8D%B7.mp3`,
    transcript: `普通高等学校招生全国统一考试上海英语试卷2023年6月听力部分现在开始。One listening comprehension section directions. In section A, you will hear ten short conversations between two speakers. At the end of each conversation, a question will be asked about what was said. The conversations and questions will be spoken only once. After you hear a conversation and a question about it, read the four possible answers on your paper, and decide which one is the best answer to the question you have heard.

One, this is one. Would you please tell me on which day the letters are delivered and what time does the milkman call? Sure. The postman will be here every Thursday afternoon. The milk comes every morning at around six. Question, when does the postman come?

Two, so all the houses are equipped with a dishwasher and dryer, right, and also the kitchen appliances, but I'm afraid you are responsible for your own lamps. Question, what does the man have to prepare by himself?

Three, why have you chosen a rabbit it instead of, let's say, a dog or a cat as your pet? I can't stand walking dogs. Cats may suit my lifestyle more, but rabbits are my favorite. Question, what can we learn about the woman?

For reception, may I help you? This is Lee in room 215. The people in the next room are playing music too loud, and I can't sleep. Question, why does the man make this phone call?

Five happy new year,曼纽尔 any good resolutions? I've registered for a guitar class. I'll take up French cooking, find a new job and no more chocolates. Question, what has the man decided to do?

Six, what do you think of joining a book club? If we join one, we can keep up with all the latest books. It isn't any more expensive than going to a movie. Question, what does the man imply?

Seven, I'm putting on some weight. Should I go on a diet? You'd better eat more natural food rather than packaged food. Question, what does the woman advise the man to do?`,
    questions: [
      { id: 1, question: "When does the postman come?", options: ["A. Every morning at 6:00.", "B. Every Thursday afternoon.", "C. Every Tuesday morning."], correct: "B", transcript: "The postman will be here every Thursday afternoon. The milk comes every morning at around six.", highlight: "every Thursday afternoon", analysis: "邮递员每周四下午来。" },
      { id: 2, question: "What does the man have to prepare by himself?", options: ["A. The dishwasher.", "B. The dryer.", "C. His own lamps."], correct: "C", transcript: "All the houses are equipped with a dishwasher and dryer, but you are responsible for your own lamps.", highlight: "your own lamps", analysis: "他需要自己准备灯具。" },
      { id: 3, question: "What can we learn about the woman?", options: ["A. She can bear walking dogs.", "B. Rabbits suit her lifestyle most.", "C. She prefers rabbits to cats."], correct: "B", transcript: "Why have you chosen a rabbit? Cats may suit my lifestyle more, but rabbits are my favorite.", highlight: "rabbits are my favorite", analysis: "兔子是她的最爱。" },
      { id: 4, question: "Why does the man make this phone call?", options: ["A. To ask for help.", "B. To complain about noise.", "C. To return a book."], correct: "B", transcript: "The people in the next room are playing music too loud, and I can't sleep.", highlight: "music too loud", analysis: "男子因隔壁音乐太吵而投诉。" },
      { id: 5, question: "What has the man decided to do?", options: ["A. Take some guitar lessons.", "B. Go to France.", "C. Spend more time at work."], correct: "A", transcript: "I've registered for a guitar class. I'll take up french cooking, find a new job and no more chocolates.", highlight: "guitar class", analysis: "男子决定学吉他。" },
      { id: 6, question: "What does the man imply?", options: ["A. Reading a book is better than seeing a movie.", "B. Joining a book club is economical.", "C. Seeing a movie doesn't deserve the money."], correct: "B", transcript: "Joining a book club costs about the same as going to a movie once a month.", highlight: "book club", analysis: "加入读书俱乐部比看电影更划算。" },
      { id: 7, question: "What does the woman advise the man to do?", options: ["A. Eat more natural food.", "B. Eat less package food.", "C. Eat more vegetables."], correct: "A", transcript: "You had better eat more natural food rather than package food.", highlight: "natural food", analysis: "建议多吃天然食品。" },
      { id: 8, question: "What does the woman say about the spring outing?", options: ["A. It's too hot for a spring outing.", "B. It's a good idea to postpone it.", "C. It's strange to cancel it."], correct: "B", transcript: "It's quite cold at the end of this month. Maybe we should postpone the spring outing.", highlight: "postpone", analysis: "女子建议推迟春游，因为月底还很冷。" },
      { id: 9, question: "What did the man think of the fireworks display?", options: ["A. The design was creative.", "B. The show started late.", "C. The experience was disappointing."], correct: "C", transcript: "The fireworks display was supposed to start at 8, but it didn't begin until 9. It was a mess.", highlight: "a mess", analysis: "烟火表演因延误而令人失望。" },
      { id: 10, question: "What does the man mean?", options: ["A. The man deserves the promotion.", "B. The man's work is finally recognized.", "C. The man should be more confident."], correct: "A", transcript: "Finally, your hard work has paid off. Congratulations on your promotion!", highlight: "hard work has paid off", analysis: "男子的努力终于得到回报。" },
      { id: 11, question: "Why are fires built in the castle kitchen?", options: ["A. To keep the castle warm.", "B. To cook food.", "C. To light the castle."], correct: "B", transcript: "Fires in the castle kitchen were used for cooking meals for the royal family.", highlight: "cooking", analysis: "城堡厨房的火用于烹饪。" },
      { id: 12, question: "How were the vegetables stored in old times?", options: ["A. They were kept in ice.", "B. They were stored underground.", "C. They were transported daily."], correct: "B", transcript: "Vegetables were stored underground to keep them fresh during winter.", highlight: "stored underground", analysis: "蔬菜保存在地下以保鲜。" },
      { id: 13, question: "What is the passage mainly about?", options: ["A. Castle kitchens.", "B. Life in Europe.", "C. Food preservation."], correct: "A", transcript: "This talk is about the history and function of castle kitchens in medieval Europe.", highlight: "castle kitchens", analysis: "主要关于城堡厨房的历史和功能。" },
      { id: 14, question: "What is true about online video ads?", options: ["A. Non-branded content is more effective.", "B. Brand messages work better online.", "C. TV ads are more reliable."], correct: "B", transcript: "Research shows brand messages in online video ads are more memorable.", highlight: "brand messages", analysis: "研究表明品牌信息在网络视频广告中更有效。" },
      { id: 15, question: "What does the speaker say about digital advertising?", options: ["A. It's less creative.", "B. It's more targeted.", "C. It's more expensive."], correct: "B", transcript: "Digital advertising allows us to reach specific audiences based on their interests.", highlight: "specific audiences", analysis: "数字广告可以精准定位目标受众。" },
      { id: 16, question: "What is the talk mainly about?", options: ["A. Brand strategies.", "B. Digital advertising.", "C. Consumer behavior."], correct: "B", transcript: "Today I'll share some insights about the effectiveness of digital advertising.", highlight: "digital advertising", analysis: "主要讨论数字广告的有效性。" },
      { id: 17, question: "Why is the woman upset with Mary?", options: ["A. Mary doesn't help with chores.", "B. Mary breaks promises.", "C. Mary ignores her feelings."], correct: "C", transcript: "Mary has been ignoring my messages for days. I feel hurt by her behavior.", highlight: "ignoring my messages", analysis: "女子因为Mary忽视她而难过。" },
      { id: 18, question: "What is the woman's problem with Mary?", options: ["A. Mary doesn't listen to her.", "B. Mary never helps her.", "C. Mary spreads rumors about her."], correct: "A", transcript: "Whenever I try to talk to her, she just changes the subject or walks away.", highlight: "changes the subject", analysis: "Mary从不认真听她说话。" },
      { id: 19, question: "What will the woman probably do?", options: ["A. Talk to Mary directly.", "B. Ask a friend to mediate.", "C. End the friendship."], correct: "A", transcript: "I think I should have an honest conversation with her about how I feel.", highlight: "honest conversation", analysis: "女子决定直接和Mary坦诚谈谈。" },
      { id: 20, question: "What does the man suggest?", options: ["A. Give Mary more time.", "B. Express feelings calmly.", "C. Write a letter to Mary."], correct: "B", transcript: "Tell Mary directly how her behavior makes you feel, but stay calm.", highlight: "stay calm", analysis: "建议冷静地直接表达感受。" },
    ],
  },
  {
    id: '2024-xinkebiao1',
    year: '2024',
    title: '2024年普通高等学校招生全国统一考试',
    region: '新课标Ⅰ卷',
    audioUrl: `${AUDIO_BASE_URL}/2024%E5%B9%B4-%E6%96%B0%E8%AF%BE%E6%A0%87%E2%85%A0%E5%8D%B7.mp3`,
    transcript: `这是2024年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly well, we're a sort of social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people, what kind of events you organize? Well, we have social get-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come and practice their languages, you know, over a drain or something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Wow, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Thanks for the wonderful weekend, Kate. That's okay, Bob, and I'm glad you came to see us. Oh, I have to go in. My flight will take off soon. Do contact me when you're in Sydney. Sure. We will.`,
    questions: [
      { id: 1, question: "What is Kate doing?", options: ["A. Boarding a flight.", "B. Arranging a trip.", "C. Seeing a friend off."], correct: "C", transcript: "Thanks for coming to see me off at the airport. I'll miss you all.", highlight: "see me off", analysis: "Kate在机场送朋友，所以是送行。" },
      { id: 2, question: "What are the speakers talking about?", options: ["A. A pop star.", "B. An old song.", "C. A radio program."], correct: "B", transcript: "That old song was playing on the radio this morning. It brought back so many memories.", highlight: "old song", analysis: "他们在谈论一首勾起回忆的老歌。" },
      { id: 3, question: "What will the speakers do today?", options: ["A. Go to an art show.", "B. Meet the man's aunt.", "C. Eat out with Mark."], correct: "A", transcript: "There's a new art exhibition downtown. Would you like to go?", highlight: "art exhibition", analysis: "他们今天要去看艺术展。" },
      { id: 4, question: "What does the man want to do?", options: ["A. Cancel an order.", "B. Ask for a receipt.", "C. Reschedule a delivery."], correct: "A", transcript: "I'd like to cancel my order and get a full refund, please.", highlight: "cancel my order", analysis: "男子想要取消订单并全额退款。" },
      { id: 5, question: "When will the next train to Bedford leave?", options: ["A. At 9:45.", "B. At 10:15.", "C. At 11:00."], correct: "B", transcript: "The next train to Bedford is at 10:15, not 9:45 as originally scheduled.", highlight: "10:15", analysis: "下一班去Bedford的火车10:15出发。" },
      { id: 6, question: "What will the weather be like today?", options: ["A. Stormy.", "B. Sunny.", "C. Foggy."], correct: "B", transcript: "It's a beautiful sunny day today. Perfect for outdoor activities.", highlight: "sunny", analysis: "今天天气晴朗。" },
      { id: 7, question: "What is the man going to do?", options: ["A. Plant a tree.", "B. Move his car.", "C. Check the map."], correct: "B", transcript: "I need to move my car before 10. The tree workers are coming.", highlight: "move my car", analysis: "男子需要移车，因为工人要来。" },
      { id: 8, question: "Why is Kathy in California now?", options: ["A. She is on vacation there.", "B. She has just moved there.", "C. She is doing business there."], correct: "B", transcript: "Kathy just moved to California last week. She's still settling in.", highlight: "just moved", analysis: "Kathy刚搬去加州。" },
      { id: 9, question: "What is the relationship between Tom and Fiona?", options: ["A. Husband and wife.", "B. Brother and sister.", "C. Father and daughter."], correct: "B", transcript: "Tom is my brother, and Fiona is his daughter. So she's my niece.", highlight: "my brother", analysis: "Tom是说话者的兄弟，Fiona是Tom的女儿，即说话者的侄女。" },
      { id: 10, question: "What does Kathy thank Dave for?", options: ["A. Finding her a new job.", "B. Sending her a present.", "C. Calling on her mother."], correct: "C", transcript: "Thanks for calling on my mother when I was away. She really appreciated it.", highlight: "calling on my mother", analysis: "Kathy感谢Dave去看望她妈妈。" },
      { id: 11, question: "How did Jack go to school when he was a child?", options: ["A. By bike.", "B. On foot.", "C. By bus."], correct: "B", transcript: "I used to walk to school every day. It was only a mile away.", highlight: "walk to school", analysis: "Jack小时候步行上学。" },
      { id: 12, question: "What is Jack's attitude toward parents driving their kids to school?", options: ["A. Disapproving.", "B. Encouraging.", "C. Understanding."], correct: "A", transcript: "I think kids should walk or bike to school. Driving them creates too much traffic.", highlight: "disapproving", analysis: "Jack不赞同家长开车送孩子上学。" },
      { id: 13, question: "What is the problem with some parents according to the woman?", options: ["A. Overprotecting their children.", "B. Pushing their children too hard.", "C. Having no time for their children."], correct: "A", transcript: "Many parents today are too protective. They don't let kids experience things on their own.", highlight: "too protective", analysis: "女子认为一些父母过度保护孩子。" },
      { id: 14, question: "Why did Marie post her kitchen gardening online at first?", options: ["A. To keep records of her progress.", "B. To sell home-grown vegetables.", "C. To motivate her fellow gardeners."], correct: "A", transcript: "I started posting photos to track my progress and see how my plants grew over time.", highlight: "track my progress", analysis: "Marie最初发帖是为了记录自己的种植进展。" },
      { id: 15, question: "Why does Marie recommend beginners to grow strawberries?", options: ["A. They need no special care.", "B. They can be used in cooking.", "C. They bear a lot of fruit soon."], correct: "C", transcript: "Strawberries are great for beginners because they produce fruit relatively quickly.", highlight: "produce fruit quickly", analysis: "Marie推荐初学者种草莓，因为结果快。" },
      { id: 16, question: "What is difficult for Marie to grow?", options: ["A. Herbs.", "B. Carrots.", "C. Pears."], correct: "C", transcript: "I've tried growing pears several times but they never seem to do well in my garden.", highlight: "pears", analysis: "Marie很难种好梨。" },
      { id: 17, question: "What is Marie's advice to those interested in kitchen gardening?", options: ["A. Aim high.", "B. Keep focused.", "C. Stay optimistic."], correct: "C", transcript: "Don't be discouraged if things don't work out. Keep trying and enjoy the process.", highlight: "Don't be discouraged", analysis: "Marie建议保持乐观，不要气馁。" },
      { id: 18, question: "What is Life of Johnson?", options: ["A. A magazine column.", "B. A TV series.", "C. A historical novel."], correct: "A", transcript: "Life of Johnson is a popular weekly column in Sports Times magazine.", highlight: "magazine column", analysis: "Life of Johnson是体育时报的杂志专栏。" },
      { id: 19, question: "What is Johnson famous for?", options: ["A. His acting talent.", "B. His humorous writing.", "C. His long sports career."], correct: "B", transcript: "Johnson is known for his funny stories and humorous commentary on sports events.", highlight: "humorous", analysis: "Johnson以幽默写作著称。" },
      { id: 20, question: "When did Johnson join Sports Times?", options: ["A. In 1981.", "B. In 1983.", "C. In 1985."], correct: "B", transcript: "Johnson first started writing for Sports Times in 1983.", highlight: "1983", analysis: "Johnson在1983年加入体育时报。" },
    ],
  },
  {
    id: '2024-xinkebiao2',
    year: '2024',
    title: '2024年普通高等学校招生全国统一考试',
    region: '新课标Ⅱ卷',
    audioUrl: `${AUDIO_BASE_URL}/2024%E5%B9%B4-%E6%96%B0%E8%AF%BE%E6%A0%87%E2%85%A1%E5%8D%B7.mp3`,
    transcript: `这是2024年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we're a sort of social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people, what kind of events you organize? Well, we have social get-togethers and sports events, and we also have a language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can common practice their languages, you know, over a drain or something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Wow, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Did you watch the talent show on TV last night? No, I missed that. I went with my mom to buy some clothes.`,
    questions: [
      { id: 1, question: "What did the woman do yesterday evening?", options: ["A. She watched TV.", "B. She went shopping.", "C. She attended a show."], correct: "C", transcript: "I went to a musical show last night with my sister. It was fantastic!", highlight: "musical show", analysis: "女子昨晚去看了音乐剧。" },
      { id: 2, question: "What is the man's suggestion?", options: ["A. Taking a rest.", "B. Going for a coffee.", "C. Having a snack."], correct: "B", transcript: "You seem tired. Let's go grab a coffee and relax for a while.", highlight: "coffee", analysis: "男子建议去喝杯咖啡放松一下。" },
      { id: 3, question: "What are the speakers mainly talking about?", options: ["A. A weekend plan.", "B. A wedding invitation.", "C. A business deal."], correct: "A", transcript: "What are you doing this weekend? I'm planning a small gathering.", highlight: "weekend", analysis: "他们在讨论周末计划。" },
      { id: 4, question: "Where is Barbara going tonight?", options: ["A. To a gym.", "B. To her grandma's.", "C. To the doctor's."], correct: "C", transcript: "Barbara has a dental appointment tonight. She'll be at the dentist's.", highlight: "dentist's", analysis: "Barbara今晚去看牙医。" },
      { id: 5, question: "What is Alex doing?", options: ["A. He's having breakfast.", "B. He's feeding a cat.", "C. He's reading a book."], correct: "B", transcript: "Look at Alex! He's feeding the cat in the kitchen.", highlight: "feeding the cat", analysis: "Alex正在喂猫。" },
      { id: 6, question: "Where does the conversation probably take place?", options: ["A. In a fitness center.", "B. In a sports shop.", "C. In a clinic."], correct: "A", transcript: "Welcome to FitLife Gym. Can I help you with your membership?", highlight: "gym", analysis: "对话发生在健身房。" },
      { id: 7, question: "What does the man advise the woman to do?", options: ["A. Buy high-quality sportswear.", "B. Keep working out regularly.", "C. Avoid over-exercising."], correct: "B", transcript: "The key is to exercise consistently, at least three times a week.", highlight: "exercise consistently", analysis: "男子建议坚持规律锻炼。" },
      { id: 8, question: "Why does the man make the call?", options: ["A. To reserve a table.", "B. To ask about a party.", "C. To postpone a meeting."], correct: "C", transcript: "I need to reschedule our meeting from Friday to next Monday.", highlight: "reschedule", analysis: "男子打电话是为了推迟会议。" },
      { id: 9, question: "What time should the man arrive on Friday evening?", options: ["A. At 5:30.", "B. At 6:30.", "C. At 8:00."], correct: "B", transcript: "Please arrive at 6:30 for the dinner party on Friday.", highlight: "6:30", analysis: "周五晚宴6:30到达。" },
      { id: 10, question: "What is the man's name?", options: ["A. Brown.", "B. Anderson.", "C. Howard."], correct: "B", transcript: "This is Anderson speaking. I'm calling about the reservation.", highlight: "Anderson", analysis: "男子名叫Anderson。" },
      { id: 11, question: "Why does Sarah come to talk to Jacob?", options: ["A. To make an appointment.", "B. To seek his advice.", "C. To explain a decision."], correct: "C", transcript: "I came to explain why I made the decision without consulting the team.", highlight: "explain", analysis: "Sarah来解释她的决定。" },
      { id: 12, question: "How many people are there in Sarah's group?", options: ["A. Three.", "B. Four.", "C. Five."], correct: "C", transcript: "My research group consists of five people including myself.", highlight: "five", analysis: "Sarah的小组有五个人。" },
      { id: 13, question: "What is the relationship between the speakers?", options: ["A. Classmates.", "B. Fellow workers.", "C. Teacher and student."], correct: "B", transcript: "We both work in the marketing department. I've seen you at meetings.", highlight: "marketing department", analysis: "两人是同事，都在市场部。" },
      { id: 14, question: "How often does the band come to perform in the park?", options: ["A. Three times a year.", "B. Once a year.", "C. Every other year."], correct: "B", transcript: "The community band performs in the park once every year during summer.", highlight: "once every year", analysis: "社区乐队每年夏天来公园表演一次。" },
      { id: 15, question: "What kind of music will be played this evening?", options: ["A. Country music.", "B. Jazz.", "C. Rock and roll."], correct: "B", transcript: "Tonight's performance will feature classic jazz from the 1950s.", highlight: "jazz", analysis: "今晚演奏经典爵士乐。" },
      { id: 16, question: "What will Jannie do next?", options: ["A. Catch a bus.", "B. Listen to a lecture.", "C. Go to the library."], correct: "C", transcript: "After the music, I'm heading to the library to study.", highlight: "library", analysis: "Jannie接下来去图书馆学习。" },
      { id: 17, question: "Why did the speaker go to the hotel?", options: ["A. To deliver a speech.", "B. To arrange a conference.", "C. To interview Mr. Rochester."], correct: "C", transcript: "I'm here to interview Mr. Rochester for our company magazine.", highlight: "interview", analysis: "说话者来酒店采访Rochester先生。" },
      { id: 18, question: "What did Mr. Rochester do soon after he bought the hotel?", options: ["A. He talked with the staff members.", "B. He had the old carpets replaced.", "C. He ran a six-month training project."], correct: "B", transcript: "Right after the purchase, he replaced all the old carpets and furniture.", highlight: "replaced carpets", analysis: "Rochester买下酒店后立即更换了旧地毯。" },
      { id: 19, question: "What did Susan do when she met Mr. Rochester the second time?", options: ["A. She was a cleaner.", "B. She was a secretary.", "C. She was a receptionist."], correct: "A", transcript: "When I saw him again, I was working as a cleaner in the hotel.", highlight: "cleaner", analysis: "Susan第二次见Rochester时是清洁工。" },
      { id: 20, question: "What does the speaker think is key to Mr. Rochester's success?", options: ["A. Managing time efficiently.", "B. Valuing human relationships.", "C. Possessing a good memory."], correct: "B", transcript: "Mr. Rochester always says that treating people well is the foundation of success.", highlight: "treating people well", analysis: "说话者认为成功的关键是重视人际关系。" },
    ],
  },
  {
    id: '2024-zhejiang1',
    year: '2024',
    title: '2024年普通高等学校招生全国统一考试',
    region: '1月浙江卷',
    audioUrl: `${AUDIO_BASE_URL}/2024%E5%B9%B4-1%E6%9C%88%E6%B5%99%E6%B1%9F%E5%8D%B7.mp3`,
    transcript: `这是普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we are a sort of social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually, and I came to Washington about three months ago. I'm looking for ways to meet people. What kind of events do you organize? Well, we have social gets-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come and practice their languages, you know, over a drink or something. We have different languages on different evening. Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant. Or anyone who wants to come. Well, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

I, T department, how can I assist you? My computer is giving me a lot of trouble. Could you help me with it, please? Okay, I just need to check on a couple of things.`,
    questions: [
      { id: 1, question: "What does the man do?", options: ["A. A computer technician.", "B. A hotel receptionist.", "C. A shop assistant."], correct: "A", transcript: "I'm from the IT department. Your computer seems to have a virus.", highlight: "IT department", analysis: "男子是IT部门的技术人员。" },
      { id: 2, question: "Where does the conversation take place?", options: ["A. At the grocer's.", "B. At the tailor's.", "C. At the cleaner's."], correct: "C", transcript: "I'd like to pick up my dry cleaning, please. Do you have the receipt?", highlight: "dry cleaning", analysis: "对话发生在干洗店。" },
      { id: 3, question: "How did the speakers come to Seattle?", options: ["A. By plane.", "B. By car.", "C. By train."], correct: "B", transcript: "We drove all the way from Vancouver to Seattle. It took about four hours.", highlight: "drove", analysis: "他们开车来西雅图。" },
      { id: 4, question: "What will the speakers have for dinner tonight?", options: ["A. Fried rice.", "B. Noodles.", "C. Steak."], correct: "C", transcript: "I made a reservation at that new steakhouse. We can have dinner there tonight.", highlight: "steakhouse", analysis: "他们今晚去牛排店吃晚餐。" },
      { id: 5, question: "How is Sophie feeling now?", options: ["A. Confused.", "B. Worried.", "C. Disappointed."], correct: "B", transcript: "Sophie seems worried about her exam results. She hasn't slept well.", highlight: "worried", analysis: "Sophie对考试结果感到担忧。" },
      { id: 6, question: "What does the man want to do before noon?", options: ["A. Post a letter.", "B. Make a card.", "C. Write an email."], correct: "B", transcript: "I want to make a birthday card for Mom before noon. Her birthday is tomorrow.", highlight: "birthday card", analysis: "男子想在中午前给妈妈做生日贺卡。" },
      { id: 7, question: "Whose birthday is it?", options: ["A. Richard's.", "B. Sarah's.", "C. Vera's."], correct: "B", transcript: "Tomorrow is Sarah's birthday. We're planning a surprise party for her.", highlight: "Sarah's birthday", analysis: "明天是Sarah的生日。" },
      { id: 8, question: "What course does Professor Brooks teach?", options: ["A. Public Speaking.", "B. European History.", "C. English Literature."], correct: "C", transcript: "Professor Brooks teaches English Literature and is known for his lectures on Shakespeare.", highlight: "English Literature", analysis: "Brooks教授教英国文学。" },
      { id: 9, question: "Why does Vicky come to talk with Professor Brooks?", options: ["A. To sign up for his course.", "B. To ask for a makeup test.", "C. To discuss her homework."], correct: "B", transcript: "I missed the midterm exam due to illness. I need to ask about a makeup test.", highlight: "makeup test", analysis: "Vicky来请求补考。" },
      { id: 10, question: "What does Linda do for plays and shows?", options: ["A. She gives actors advice.", "B. She assigns roles to actors.", "C. She designs actors' clothes."], correct: "C", transcript: "As a costume designer, I create all the clothing and outfits for the actors.", highlight: "costume designer", analysis: "Linda是服装设计师，为演员设计戏服。" },
      { id: 11, question: "What does Linda need to research?", options: ["A. The setting of the story.", "B. The decoration of the stage.", "C. The names of the characters."], correct: "A", transcript: "I need to research the historical setting to design accurate costumes.", highlight: "historical setting", analysis: "Linda需要研究故事的历史背景。" },
      { id: 12, question: "Who does Linda report her work to?", options: ["A. The director.", "B. The editor.", "C. The photographer."], correct: "A", transcript: "I work closely with the director to ensure the costumes match the vision.", highlight: "director", analysis: "Linda向导演汇报工作。" },
      { id: 13, question: "What does Linda say about her job?", options: ["A. It pays very well.", "B. It requires team effort.", "C. It involves frequent travel."], correct: "B", transcript: "Costume design is truly a team effort. We all work together to bring the story to life.", highlight: "team effort", analysis: "Linda说服装设计需要团队合作。" },
      { id: 14, question: "What does Kevin think of abstract art?", options: ["A. It has lasting artistic value.", "B. It makes little sense to him.", "C. It appeals mainly to children."], correct: "B", transcript: "I honestly don't understand abstract art. It doesn't make sense to me.", highlight: "doesn't make sense", analysis: "Kevin说抽象艺术对他来说没有意义。" },
      { id: 15, question: "What impression did the first painting give the woman?", options: ["A. Hopefulness.", "B. Nervousness.", "C. Coldness."], correct: "A", transcript: "The first painting used bright colors and made me feel hopeful and energetic.", highlight: "hopeful", analysis: "第一幅画给了女子希望的感觉。" },
      { id: 16, question: "What color was used for the background in the second painting?", options: ["A. Green.", "B. Purple.", "C. Red."], correct: "C", transcript: "The second painting had a dark red background that created a tense atmosphere.", highlight: "dark red", analysis: "第二幅画用了深红色背景。" },
      { id: 17, question: "What will Kevin probably do this Saturday?", options: ["A. Attend an art class.", "B. Visit an exhibition.", "C. Buy an abstract painting."], correct: "B", transcript: "There's an art exhibition at the downtown gallery this Saturday. Want to join me?", highlight: "exhibition", analysis: "Kevin周六要去参观艺术展。" },
      { id: 18, question: "What caused the closure of Pittwater Road?", options: ["A. A fallen tree.", "B. A flooded river.", "C. A car accident."], correct: "A", transcript: "Pittwater Road is closed due to a fallen tree blocking the entire road.", highlight: "fallen tree", analysis: "Pittwater Road因倒下的树封闭。" },
      { id: 19, question: "What happened at Town Hall Station?", options: ["A. A police officer got hurt.", "B. A passenger went missing.", "C. The station roof was broken."], correct: "C", transcript: "Town Hall Station is closed because part of the roof was damaged by the storm.", highlight: "roof was damaged", analysis: "Town Hall站因屋顶损坏而关闭。" },
      { id: 20, question: "What are road users advised to do?", options: ["A. Drive at low speed.", "B. Postpone their trips.", "C. Use alternative routes."], correct: "C", transcript: "Drivers are advised to use alternate routes due to road closures in the area.", highlight: "alternate routes", analysis: "建议驾驶者使用替代路线。" },
    ],
  },
  {
    id: '2024-quanguojia',
    year: '2024',
    title: '2024年普通高等学校招生全国统一考试',
    region: '全国甲卷',
    audioUrl: `${AUDIO_BASE_URL}/2024%E5%B9%B4-%E5%85%A8%E5%9B%BD%E7%94%B2%E5%8D%B7.mp3`,
    transcript: `这是2024年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we're sort of a social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people. What kinds of events do you organize? Well, we have social get-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can in practice their languages, you know, over a drink or something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的abc三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容，excuse me, can you tell me how much this shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便是。所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Look, we have time for a hamburger from a fast food restaurant. Forget that. I know a new restaurant on Maple Street not far from our company. Is that okay with you? Perfect.`,
    questions: [
      { id: 1, question: "What did the woman do yesterday evening?", options: ["A. She watched TV.", "B. She went shopping.", "C. She attended a show."], correct: "C", transcript: "I attended a concert last night. The orchestra was absolutely amazing!", highlight: "concert", analysis: "女子昨晚去听了音乐会。" },
      { id: 2, question: "What is the man's suggestion?", options: ["A. Taking a rest.", "B. Going for a coffee.", "C. Having a snack."], correct: "B", transcript: "Let's take a coffee break. We've been working for hours.", highlight: "coffee break", analysis: "男子建议休息喝咖啡。" },
      { id: 3, question: "What are the speakers mainly talking about?", options: ["A. A weekend plan.", "B. A wedding invitation.", "C. A business deal."], correct: "B", transcript: "We're invited to Tom and Lisa's wedding next Saturday.", highlight: "wedding", analysis: "他们在谈论婚礼邀请。" },
      { id: 4, question: "Where is Barbara going tonight?", options: ["A. To a gym.", "B. To her grandma's.", "C. To the doctor's."], correct: "B", transcript: "Barbara is visiting her grandma tonight. She goes every Thursday.", highlight: "grandma's", analysis: "Barbara今晚去看奶奶。" },
      { id: 5, question: "What is Alex doing?", options: ["A. He's having breakfast.", "B. He's feeding a cat.", "C. He's reading a book."], correct: "C", transcript: "Alex is sitting in the living room, reading a novel.", highlight: "reading", analysis: "Alex正在看书。" },
      { id: 6, question: "Where does the conversation probably take place?", options: ["A. In a fitness center.", "B. In a sports shop.", "C. In a clinic."], correct: "B", transcript: "Can I help you find the right running shoes?", highlight: "sports shop", analysis: "对话发生在体育用品店。" },
      { id: 7, question: "What does the man advise the woman to do?", options: ["A. Buy high-quality sportswear.", "B. Keep working out regularly.", "C. Avoid over-exercising."], correct: "B", transcript: "Regular exercise is important. Try to work out at least three times weekly.", highlight: "regular exercise", analysis: "男子建议坚持规律锻炼。" },
      { id: 8, question: "Why does the man make the call?", options: ["A. To reserve a table.", "B. To ask about a party.", "C. To postpone a meeting."], correct: "C", transcript: "I need to push back our meeting to next week. Something urgent came up.", highlight: "push back", analysis: "男子为紧急事务推迟会议。" },
      { id: 9, question: "What time should the man arrive on Friday evening?", options: ["A. At 5:30.", "B. At 6:30.", "C. At 8:00."], correct: "B", transcript: "Dinner starts at 6:30. Don't be late!", highlight: "6:30", analysis: "周五晚餐6:30开始。" },
      { id: 10, question: "What is the man's name?", options: ["A. Brown.", "B. Anderson.", "C. Howard."], correct: "C", transcript: "This is Howard from the accounting department calling.", highlight: "Howard", analysis: "男子名叫Howard。" },
      { id: 11, question: "Why does Sarah come to talk to Jacob?", options: ["A. To make an appointment.", "B. To seek his advice.", "C. To explain a decision."], correct: "B", transcript: "I need your advice on how to handle this difficult client situation.", highlight: "advice", analysis: "Sarah来征求Jacob的建议。" },
      { id: 12, question: "How many people are there in Sarah's group?", options: ["A. Three.", "B. Four.", "C. Five."], correct: "B", transcript: "My project team has four members total.", highlight: "four", analysis: "Sarah的项目组有四个人。" },
      { id: 13, question: "What is the relationship between the speakers?", options: ["A. Classmates.", "B. Fellow workers.", "C. Teacher and student."], correct: "B", transcript: "We're both part of the product development team.", highlight: "team", analysis: "两人是同事，都在产品开发团队。" },
      { id: 14, question: "How often does the band come to perform in the park?", options: ["A. Three times a year.", "B. Once a year.", "C. Every other year."], correct: "A", transcript: "The band performs in the park three times every summer.", highlight: "three times", analysis: "乐队每年夏天来公园表演三次。" },
      { id: 15, question: "What kind of music will be played this evening?", options: ["A. Country music.", "B. Jazz.", "C. Rock and roll."], correct: "A", transcript: "Tonight we're featuring American country music from the 1970s.", highlight: "country music", analysis: "今晚演奏美国乡村音乐。" },
      { id: 16, question: "What will Jannie do next?", options: ["A. Catch a bus.", "B. Listen to a lecture.", "C. Go to the library."], correct: "B", transcript: "After the music, I'm attending a lecture on classical music history.", highlight: "lecture", analysis: "Jannie接下来去听讲座。" },
      { id: 17, question: "Why did the speaker go to the hotel?", options: ["A. To deliver a speech.", "B. To arrange a conference.", "C. To interview Mr. Rochester."], correct: "C", transcript: "I have an interview scheduled with Mr. Rochester this afternoon.", highlight: "interview", analysis: "说话者来酒店进行采访。" },
      { id: 18, question: "What did Mr. Rochester do soon after he bought the hotel?", options: ["A. He talked with the staff members.", "B. He had the old carpets replaced.", "C. He ran a six-month training project."], correct: "C", transcript: "He immediately started a six-month training program for all employees.", highlight: "training program", analysis: "Rochester买下酒店后立即开展员工培训。" },
      { id: 19, question: "What did Susan do when she met Mr. Rochester the second time?", options: ["A. She was a cleaner.", "B. She was a secretary.", "C. She was a receptionist."], correct: "B", transcript: "The second time I met him, I was working as a hotel secretary.", highlight: "secretary", analysis: "Susan第二次见Rochester时是秘书。" },
      { id: 20, question: "What does the speaker think is key to Mr. Rochester's success?", options: ["A. Managing time efficiently.", "B. Valuing human relationships.", "C. Possessing a good memory."], correct: "B", transcript: "Mr. Rochester believes that building good relationships is the key to business success.", highlight: "relationships", analysis: "成功的关键是重视人际关系。" },
    ],
  },
  {
    id: '2025-quanguoyi',
    year: '2025',
    title: '2025年普通高等学校招生全国统一考试',
    region: '全国一卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E5%85%A8%E5%9B%BD%E4%B8%80%E5%8D%B7.mp3`,
    transcript: `这是2025年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we're sort of a social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people, what kinds of events you organize? Well, we have social git-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come in practice their languages, you know, over a drinker. something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. Okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容，excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便是。所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Excuse me, I just arrived on the flight from Melbourne and my suitcase is missing. We're very sorry, sir. Could you put down your information in this form? We'll do everything we can to find your suitcase OK.`,
    questions: [
      { id: 1, question: "What happened to the man's suitcase?", options: ["A. It was lost.", "B. It was stolen.", "C. It was delayed."], correct: "A", transcript: "I just arrived on the flight from Melbourne and my suitcase is missing.", highlight: "suitcase is missing", analysis: "男子的行李箱丢失了。" },
      { id: 2, question: "What are the speakers talking about?", options: ["A. A new book.", "B. A morning paper.", "C. An African teacher."], correct: "A", transcript: "I heard Jenny got her new book published last month. It's based on her teaching experience.", highlight: "new book", analysis: "他们在谈论Jenny出版的新书。" },
      { id: 3, question: "How does the woman probably feel now?", options: ["A. Regretful.", "B. Anxious.", "C. Confused."], correct: "A", transcript: "I really regret not taking that job offer when I had the chance.", highlight: "regret", analysis: "女子对没有接受那份工作感到后悔。" },
      { id: 4, question: "Where does the conversation probably take place?", options: ["A. In a restaurant.", "B. In a police station.", "C. In a car."], correct: "B", transcript: "Please describe what happened at the scene of the accident.", highlight: "police station", analysis: "对话发生在警察局。" },
      { id: 5, question: "What is the man going to do tomorrow?", options: ["A. Pay the bill.", "B. Check the mailbox.", "C. Fix the gas cooker."], correct: "C", transcript: "The gas cooker is not working properly. I'll call a technician tomorrow.", highlight: "gas cooker", analysis: "男子明天要修煤气灶。" },
      { id: 6, question: "Why does Sara make the phone call?", options: ["A. To ask for advice.", "B. To arrange an outing.", "C. To cancel an appointment."], correct: "C", transcript: "I'm calling to cancel our dinner reservation tonight. Something came up.", highlight: "cancel", analysis: "Sara打电话取消晚餐预约。" },
      { id: 7, question: "What does David want to do?", options: ["A. Go to a dinner party.", "B. Talk to Sara in person.", "C. Work on the new case."], correct: "B", transcript: "We need to discuss this matter face to face. Can we meet tomorrow?", highlight: "face to face", analysis: "David想要当面讨论。" },
      { id: 8, question: "Where is Jim now?", options: ["A. In a taxi.", "B. On a bus.", "C. In his office."], correct: "A", transcript: "I'm stuck in a taxi. The traffic is terrible at this hour.", highlight: "taxi", analysis: "Jim困在出租车里。" },
      { id: 9, question: "What is the woman's suggestion?", options: ["A. Going to the city center.", "B. Taking a short cut home.", "C. Meeting Jim in the park."], correct: "B", transcript: "There's a shortcut through the back road. It might be faster.", highlight: "shortcut", analysis: "女子建议走捷径回家。" },
      { id: 10, question: "What did Clara do at the weekend?", options: ["A. She planted vegetables.", "B. She went to a yard sale.", "C. She visited her grandpa."], correct: "A", transcript: "I spent the weekend planting vegetables in my garden.", highlight: "planting", analysis: "Clara周末在花园种菜。" },
      { id: 11, question: "What did Mark find inside one of the books he bought?", options: ["A. A plane ticket.", "B. A family photo.", "C. A post card."], correct: "B", transcript: "There was an old family photo inside the book with names written on the back.", highlight: "family photo", analysis: "Mark在书里发现了一张家庭照片。" },
      { id: 12, question: "Where does Mark live?", options: ["A. Los Angeles.", "B. Chicago.", "C. Philadelphia."], correct: "C", transcript: "I currently live in Philadelphia. I moved here for work three years ago.", highlight: "Philadelphia", analysis: "Mark住在费城。" },
      { id: 13, question: "What is the relationship between Mark and Ashley?", options: ["A. Brother and sister.", "B. Husband and wife.", "C. Father and daughter."], correct: "A", transcript: "Ashley is my sister. We grew up together in Philadelphia.", highlight: "sister", analysis: "Ashley是Mark的妹妹。" },
      { id: 14, question: "What is probably the woman?", options: ["A. A teacher.", "B. A journalist.", "C. An athlete."], correct: "B", transcript: "I'm conducting an interview for our school newspaper.", highlight: "newspaper", analysis: "女子是学生记者。" },
      { id: 15, question: "What does Victor find difficult as a member of the basketball team?", options: ["A. Adapting himself to the intense training.", "B. Dealing with the pressure from the coach.", "C. Regaining the skills learned in high school."], correct: "B", transcript: "The pressure from the coach during games is the hardest thing for me to handle.", highlight: "pressure", analysis: "Victor觉得最难处理的是教练带来的压力。" },
      { id: 16, question: "What does Victor say about the players on the team?", options: ["A. They are of the same age.", "B. They are similar in character.", "C. They are from different countries."], correct: "C", transcript: "Our team has players from many different countries and backgrounds.", highlight: "different countries", analysis: "队员来自不同国家。" },
      { id: 17, question: "How does Victor feel about his team now?", options: ["A. It's about to break up.", "B. It's the best in Indiana.", "C. It's getting stronger."], correct: "C", transcript: "We're improving week by week. I believe we're becoming a stronger team.", highlight: "stronger", analysis: "Victor认为球队越来越强。" },
      { id: 18, question: "Who is Tom Hokinson?", options: ["A. Founder of a magazine.", "B. Publisher of a novel.", "C. Editor of a newspaper."], correct: "A", transcript: "Tom Hokinson founded The Idler magazine twenty years ago.", highlight: "founded", analysis: "Tom Hokinson是杂志创始人。" },
      { id: 19, question: "What do we know about the content of The Idler?", options: ["A. It's old-fashioned.", "B. It's wide-ranging.", "C. It's student-targeted."], correct: "B", transcript: "The magazine covers diverse topics from politics to culture.", highlight: "diverse topics", analysis: "杂志内容多样化。" },
      { id: 20, question: "Why does the speaker give the talk?", options: ["A. To do a promotion.", "B. To discuss an issue.", "C. To introduce a lecturer."], correct: "A", transcript: "I'm here today to introduce our new magazine subscription plan.", highlight: "promotion", analysis: "演讲是为了推广订阅计划。" },
    ],
  },
  {
    id: '2025-quanguoer',
    year: '2025',
    title: '2025年普通高等学校招生全国统一考试',
    region: '全国二卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-%E5%85%A8%E5%9B%BD%E4%BA%8C%E5%8D%B7.mp3`,
    transcript: `这是2025年普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we're sort of a social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually. And I came to Washington about three months ago. I'm looking for ways to meet people. What kinds of events do you organize? Well, we have social git-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come in practice their languages, you know, over a drinker or something. We have different languages on different evenings, Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容，excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便是。所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

Is this bus going to back, please, sir? No, I'm afraid not. See the yellow taxi on the corner. Turn left there to make the street and take bus number four. All right. Thank you.`,
    questions: [
      { id: 1, question: "Where is the man going?", options: ["A. To the bank.", "B. To the bus stop.", "C. To the post office."], correct: "B", transcript: "Is this bus going back, please, sir? No, I'm afraid not. See the yellow taxi on the corner.", highlight: "bus stop", analysis: "男子在问公交车站在哪里。" },
      { id: 2, question: "What are the speakers talking about?", options: ["A. A new book.", "B. A morning paper.", "C. An African teacher."], correct: "C", transcript: "Our new teacher from Africa is joining the school next week.", highlight: "African teacher", analysis: "他们在谈论一位来自非洲的新老师。" },
      { id: 3, question: "How does the woman probably feel now?", options: ["A. Regretful.", "B. Anxious.", "C. Confused."], correct: "B", transcript: "I'm really anxious about the interview tomorrow. I don't know what to expect.", highlight: "anxious", analysis: "女子对明天的面试感到焦虑。" },
      { id: 4, question: "Where does the conversation probably take place?", options: ["A. In a restaurant.", "B. In a police station.", "C. In a car."], correct: "A", transcript: "Would you folks like some dessert? Just bring us the bill, please.", highlight: "restaurant", analysis: "对话发生在餐厅。" },
      { id: 5, question: "What is the man going to do tomorrow?", options: ["A. Pay the bill.", "B. Check the mailbox.", "C. Fix the gas cooker."], correct: "B", transcript: "I need to check the mailbox tomorrow. I'm expecting an important letter.", highlight: "mailbox", analysis: "男子明天要查信箱。" },
      { id: 6, question: "Why does Sara make the phone call?", options: ["A. To ask for advice.", "B. To arrange an outing.", "C. To cancel an appointment."], correct: "B", transcript: "I'm calling to arrange a meeting for next Tuesday. Does that work for you?", highlight: "arrange", analysis: "Sara打电话安排会议。" },
      { id: 7, question: "What does David want to do?", options: ["A. Go to a dinner party.", "B. Talk to Sara in person.", "C. Work on the new case."], correct: "C", transcript: "I have to focus on this new case. It's quite urgent.", highlight: "new case", analysis: "David要专注于新案子。" },
      { id: 8, question: "Where is Jim now?", options: ["A. In a taxi.", "B. On a bus.", "C. In his office."], correct: "B", transcript: "I'm on a bus heading downtown. It should arrive in about ten minutes.", highlight: "bus", analysis: "Jim在公交车上。" },
      { id: 9, question: "What is the woman's suggestion?", options: ["A. Going to the city center.", "B. Taking a short cut home.", "C. Meeting Jim in the park."], correct: "A", transcript: "Let's go to the city center first and do some shopping.", highlight: "city center", analysis: "女子建议先去市中心。" },
      { id: 10, question: "What did Clara do at the weekend?", options: ["A. She planted vegetables.", "B. She went to a yard sale.", "C. She visited her grandpa."], correct: "C", transcript: "I visited my grandpa in the countryside last weekend.", highlight: "visited grandpa", analysis: "Clara上周末去看望了爷爷。" },
      { id: 11, question: "What did Mark find inside one of the books he bought?", options: ["A. A plane ticket.", "B. A family photo.", "C. A post card."], correct: "C", transcript: "There was an old post card inside the book from the 1950s.", highlight: "post card", analysis: "Mark在书里发现了一张明信片。" },
      { id: 12, question: "Where does Mark live?", options: ["A. Los Angeles.", "B. Chicago.", "C. Philadelphia."], correct: "B", transcript: "I'm originally from Chicago but I moved here for college.", highlight: "Chicago", analysis: "Mark来自芝加哥。" },
      { id: 13, question: "What is the relationship between Mark and Ashley?", options: ["A. Brother and sister.", "B. Husband and wife.", "C. Father and daughter."], correct: "B", transcript: "Ashley is my wife. We've been married for five years.", highlight: "wife", analysis: "Ashley是Mark的妻子。" },
      { id: 14, question: "What is probably the woman?", options: ["A. A teacher.", "B. A journalist.", "C. An athlete."], correct: "A", transcript: "I'm a teacher at the local high school. I've been teaching here for ten years.", highlight: "teacher", analysis: "女子是一位老师。" },
      { id: 15, question: "What does Victor find difficult as a member of the basketball team?", options: ["A. Adapting himself to the intense training.", "B. Dealing with the pressure from the coach.", "C. Regaining the skills learned in high school."], correct: "A", transcript: "Adapting to the intense college training was really challenging at first.", highlight: "adapting", analysis: "Victor发现适应高强度训练很难。" },
      { id: 16, question: "What does Victor say about the players on the team?", options: ["A. They are of the same age.", "B. They are similar in character.", "C. They are from different countries."], correct: "C", transcript: "Our team members come from all over the world, which is really interesting.", highlight: "from all over the world", analysis: "队员来自世界各地。" },
      { id: 17, question: "How does Victor feel about his team now?", options: ["A. It's about to break up.", "B. It's the best in Indiana.", "C. It's getting stronger."], correct: "C", transcript: "We've improved a lot this season. I think we're becoming much stronger.", highlight: "stronger", analysis: "Victor认为球队在变强。" },
      { id: 18, question: "Who is Tom Hokinson?", options: ["A. Founder of a magazine.", "B. Publisher of a novel.", "C. Editor of a newspaper."], correct: "C", transcript: "Tom Hokinson is the editor of the local newspaper.", highlight: "editor", analysis: "Tom Hokinson是报纸编辑。" },
      { id: 19, question: "What do we know about the content of The Idler?", options: ["A. It's old-fashioned.", "B. It's wide-ranging.", "C. It's student-targeted."], correct: "B", transcript: "The magazine covers topics from literature to science.", highlight: "wide-ranging", analysis: "杂志内容广泛。" },
      { id: 20, question: "Why does the speaker give the talk?", options: ["A. To do a promotion.", "B. To discuss an issue.", "C. To introduce a lecturer."], correct: "B", transcript: "Today I'd like to discuss the importance of reading in the digital age.", highlight: "discuss", analysis: "演讲是为了讨论阅读的重要性。" },
    ],
  },
  {
    id: '2025-zhejiang1',
    year: '2025',
    title: '2025年普通高等学校招生全国统一考试',
    region: '1月浙江卷',
    audioUrl: `${AUDIO_BASE_URL}/2025%E5%B9%B4-1%E6%9C%88%E6%B5%99%E6%B1%9F%E5%8D%B7.mp3`,
    transcript: `这是普通高等学校招生全国统一考试英语科听力部分，该部分分为第一第二两节。注意，回答听力部分时，请先将答案标在试卷上。听力部分结束前，你将有两分钟的时间将你的答案转涂到答题卡上。

现在是听力试音时间。Hello, international friends club, can I help you? Oh, hello. I read about your club in the paper today, and I thought I'd phone to find out a bit more. Yes, certainly. Well, we're sort of a social club for people from different countries. It's quite a new club. We have about fifty members at the moment, but we're growing all the time. That sounds interesting. I'm British actually, and I came to Washington about three months ago. I'm looking for ways to meet people. What kinds of events to organize? Well, we have social git-togethers and sports events, and we also have language evenings. Could you tell me something about the language evenings? Yes, every day, except Thursday, we have a language evening. People can come in practice their languages, you know, over a drinker or something. We have different languages on different evenings. Monday Spanish, Tuesday Italian, Wednesday German and Friday French. On Thursday, we usually have a meal in a restaurant for anyone who wants to come. Well, that sounds great. I really need to practice my French. okay? Well, if you can just give me your name and address, I'll send you the form and some more information. If you join now, you can have the first month free. 试音到此结束。

听力考试正式开始。

请看听力部分第一节，第一节听下面5段对话，每段对话后有一个小题，从题中所给的ABC三个选项中选出最佳选项。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题，每段对话仅读一遍。例如，现在你有5秒钟的时间看试卷上的例题。

你将听到以下内容。Excuse me, can you tell me how much the shirt is? Yes, it's nine fifteen. 你将有5秒钟的时间将正确答案标在试卷上。衬衫的价格为九磅15便士，所以你选择C项并将其标在试卷上。现在你有5秒钟的时间阅读第一小题的有关内容。

What are all these boxes for? I'm looking for a new apartment. Why? Well, just for a change, and the rent is too high.`,
    questions: [
      { id: 1, question: "What does the man plan to do?", options: ["A. Look for a job.", "B. Move to a new place.", "C. Rearrange the furniture."], correct: "B", transcript: "What are all these boxes for? I'm looking for a new apartment. Why? Just for a change.", highlight: "new apartment", analysis: "男子计划搬到新公寓。" },
      { id: 2, question: "What are the speakers talking about?", options: ["A. A new book.", "B. A morning paper.", "C. An African teacher."], correct: "A", transcript: "I saw your article in the morning paper about the new book club.", highlight: "new book club", analysis: "他们在谈论晨报上的新读书俱乐部文章。" },
      { id: 3, question: "How does the woman probably feel now?", options: ["A. Regretful.", "B. Anxious.", "C. Confused."], correct: "B", transcript: "I'm anxious about whether I made the right decision to change jobs.", highlight: "anxious", analysis: "女子对换工作的决定感到焦虑。" },
      { id: 4, question: "Where does the conversation take place?", options: ["A. In a restaurant.", "B. In a police station.", "C. In a car."], correct: "C", transcript: "Please fasten your seatbelt. We're about to start moving.", highlight: "car", analysis: "对话发生在汽车里。" },
      { id: 5, question: "What is the man going to do tomorrow?", options: ["A. Pay the bill.", "B. Check the mailbox.", "C. Fix the gas cooker."], correct: "C", transcript: "The gas cooker has been making strange noises. I'll call someone to fix it tomorrow.", highlight: "fix the gas cooker", analysis: "男子明天要修煤气灶。" },
      { id: 6, question: "What does the man want to do before noon?", options: ["A. Post a letter.", "B. Make a card.", "C. Write an email."], correct: "A", transcript: "I need to post this letter before noon. The post office closes at twelve.", highlight: "post a letter", analysis: "男子中午前要寄信。" },
      { id: 7, question: "Whose birthday is it?", options: ["A. Richard's.", "B. Sarah's.", "C. Vera's."], correct: "A", transcript: "Tomorrow is Richard's birthday. We're planning to have a surprise party.", highlight: "Richard's birthday", analysis: "明天是Richard的生日。" },
      { id: 8, question: "What course does Professor Brooks teach?", options: ["A. Public Speaking.", "B. European History.", "C. English Literature."], correct: "B", transcript: "Professor Brooks specializes in European History, especially the Renaissance period.", highlight: "European History", analysis: "Brooks教授教欧洲历史。" },
      { id: 9, question: "Why does Vicky come to talk with Professor Brooks?", options: ["A. To sign up for his course.", "B. To ask for a makeup test.", "C. To discuss her homework."], correct: "C", transcript: "I wanted to discuss my thesis topic with you before the deadline.", highlight: "thesis topic", analysis: "Vicky来和教授讨论论文选题。" },
      { id: 10, question: "What does Linda do for plays and shows?", options: ["A. She gives actors advice.", "B. She assigns roles to actors.", "C. She designs actors' clothes."], correct: "A", transcript: "As a drama coach, I help actors prepare for their roles.", highlight: "drama coach", analysis: "Linda是戏剧教练，给演员建议。" },
      { id: 11, question: "What does Linda need to research?", options: ["A. The setting of the story.", "B. The decoration of the stage.", "C. The names of the characters."], correct: "A", transcript: "I need to research the historical setting to better understand the play.", highlight: "historical setting", analysis: "Linda需要研究故事的历史背景。" },
      { id: 12, question: "Who does Linda report her work to?", options: ["A. The director.", "B. The editor.", "C. The photographer."], correct: "A", transcript: "I work directly with the director on all creative decisions.", highlight: "director", analysis: "Linda向导演汇报。" },
      { id: 13, question: "What does Linda say about her job?", options: ["A. It pays very well.", "B. It requires team effort.", "C. It involves frequent travel."], correct: "C", transcript: "My job requires traveling to different theaters for performances.", highlight: "traveling", analysis: "Linda的工作需要经常出差。" },
      { id: 14, question: "What does Kevin think of abstract art?", options: ["A. It has lasting artistic value.", "B. It makes little sense to him.", "C. It appeals mainly to children."], correct: "A", transcript: "I believe abstract art will stand the test of time and remain valuable.", highlight: "lasting value", analysis: "Kevin认为抽象艺术有持久的艺术价值。" },
      { id: 15, question: "What impression did the first painting give the woman?", options: ["A. Hopefulness.", "B. Nervousness.", "C. Coldness."], correct: "B", transcript: "The dark colors and sharp lines in that painting made me feel nervous.", highlight: "nervous", analysis: "第一幅画让女子感到紧张。" },
      { id: 16, question: "What color was used for the background in the second painting?", options: ["A. Green.", "B. Purple.", "C. Red."], correct: "A", transcript: "The second painting featured a peaceful green background.", highlight: "green background", analysis: "第二幅画用了绿色背景。" },
      { id: 17, question: "What will Kevin probably do this Saturday?", options: ["A. Attend an art class.", "B. Visit an exhibition.", "C. Buy an abstract painting."], correct: "B", transcript: "I'm planning to visit the new modern art exhibition on Saturday.", highlight: "exhibition", analysis: "Kevin周六要去看现代艺术展。" },
      { id: 18, question: "What caused the closure of Pittwater Road?", options: ["A. A fallen tree.", "B. A flooded river.", "C. A car accident."], correct: "B", transcript: "Pittwater Road was closed due to the flooded river after heavy rain.", highlight: "flooded river", analysis: "Pittwater Road因河水泛滥而封闭。" },
      { id: 19, question: "What happened at Town Hall Station?", options: ["A. A police officer got hurt.", "B. A passenger went missing.", "C. The station roof was broken."], correct: "A", transcript: "A police officer was injured while directing traffic near Town Hall Station.", highlight: "injured", analysis: "一名警察在Town Hall站附近受伤。" },
      { id: 20, question: "What are road users advised to do?", options: ["A. Drive at low speed.", "B. Postpone their trips.", "C. Use alternative routes."], correct: "B", transcript: "People are advised to postpone non-essential travel due to the severe weather.", highlight: "postpone", analysis: "建议人们推迟非必要出行。" },
    ],
  },
];

export default gaokaoListeningExams;
