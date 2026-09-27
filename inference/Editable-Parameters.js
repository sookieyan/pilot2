// Flexible Inference

var FI_trial = {
    type: 'flexible-inference',
    correct_response: jsPsych.timelineVariable('correct_response'),
    feedback: true,
    feedback_message: jsPsych.timelineVariable('feedback'),
    button_text: "继续",
    set: jsPsych.timelineVariable('Setlist'),
    movelist: jsPsych.timelineVariable('movelist'),
    prompt: "根据左侧目标项和右侧选项之间的共同特征或规律，选择与左侧目标项最匹配的一组选项。"
};


var test_block = {
timeline: [FI_trial],
timeline_variables: [
    { Setlist: "Set1", movelist: ["x1_x1", "x2_x2", "x3_x3", "x4_x4",  "y1_y1", "y2_y2",  "y3_y3", "y4_y4"], correct_response: 4, feedback: "高亮标记的是正确答案，因为这三个词都与食物或进食有关。"},
    { Setlist: "Set1", movelist: ["x1_y3", "x2_x2", "x3_x4", "x4_x1",  "y1_x3", "y2_y2",  "y3_y4", "y4_y1"], correct_response: 2, feedback: "高亮标记的是正确答案，因为这三个词语都属于“动词 + 结果补语” 构成的形容词短语。"},
    { Setlist: "Set1", movelist: ["x1_x3", "x2_y1", "x3_y4", "x4_y3",  "y1_y2", "y2_x1",  "y3_x2", "y4_x4"], correct_response: 3, feedback: "高亮标记的是正确答案，因为这三个词语都是上下结构。"},
    { Setlist: "Set2", movelist: ["x1_x1", "x2_x2", "x3_x3", "x4_x4",  "y1_y1", "y2_y2",  "y3_y3", "y4_y4"], correct_response: 1, feedback: "高亮标记的是正确答案，因为这三个词都与飞行有关。"},
    { Setlist: "Set2", movelist: ["x1_x3", "x2_y1", "x3_x2", "x4_x1",  "y1_y2", "y2_y4",  "y3_y3", "y4_x4"], correct_response: 3, feedback: "高亮标记的是正确答案，因为构成这三个词语字都是“虫字旁”的形声字。"},
    { Setlist: "Set2", movelist: ["x1_x1", "x2_x4", "x3_y4", "x4_x2",  "y1_y1", "y2_y2",  "y3_y3", "y4_x3"], correct_response: 4, feedback: "高亮标记的是正确答案，因为这三个词的韵母一致，即蝙蝠（biān fú）甜度（tián dù）辩护（biàn hù）。"},
    { Setlist: "Set3", movelist: ["x1_x1", "x2_x2", "x3_x3", "x4_x4",  "y1_y1", "y2_y2",  "y3_y3", "y4_y4"], correct_response: 1, feedback: "高亮标记的是正确答案，因为 600 加 189 等于 789。"},
    { Setlist: "Set3", movelist: ["x1_x2", "x2_x4", "x3_y1", "x4_y3",  "y1_y2", "y2_y4",  "y3_x3", "y4_x1"], correct_response: 3, feedback: "高亮标记的是正确答案，因为这三个数字均由连续的数字组成。"},
    { Setlist: "Set3", movelist: ["x1_x3", "x2_y1", "x3_y3", "x4_x4",  "y1_x1", "y2_y4",  "y3_y2", "y4_x2"], correct_response: 1, feedback: "高亮标记的是正确答案，因为这三个数字均由 7、8、9 这三个数字组合而成。"},
    { Setlist: "Set4", movelist: ["x1_x1", "x2_x2", "x3_x3", "x4_x4",  "y1_y1", "y2_y2",  "y3_y3", "y4_y4"], correct_response: 3, feedback: "高亮标记的是正确答案，因为11 x 9 = 99."},
    { Setlist: "Set4", movelist: ["x1_y2", "x2_y4", "x3_y3", "x4_x4",  "y1_y1", "y2_x3",  "y3_x2", "y4_x1"], correct_response: 4, feedback: "高亮标记的是正确答案，因为构成这三个数字的数位排列呈对称模式。"},
    { Setlist: "Set4", movelist: ["x1_x4", "x2_y1", "x3_x2", "x4_y4",  "y1_y3", "y2_x1",  "y3_x3", "y4_y2"], correct_response: 2, feedback: "高亮标记的是正确答案，因为这三个数字的各位数之和均为18。"},
    { Setlist: "Set5", movelist: ["x1_x1", "x2_x2", "x3_x3", "x4_x4",  "y1_y1", "y2_y2",  "y3_y3", "y4_y4"], correct_response: 2, feedback: "高亮标记的是正确答案，因为这三张图片都呈现出 “阶梯状”。"},
    { Setlist: "Set5", movelist: ["x1_y2", "x2_x2", "x3_y4", "x4_x1",  "y1_y1", "y2_x3",  "y3_y3", "y4_x4"], correct_response: 3, feedback: "高亮标记的是正确答案，因为这三张图片都具有黑白相间的图案。"},
    { Setlist: "Set5", movelist: ["x1_x3", "x2_y1", "x3_x1", "x4_y4",  "y1_y2", "y2_x2",  "y3_y3", "y4_x4"], correct_response: 2, feedback: "高亮标记的是正确答案，因为这三张图片都包含 3 个圆形。"},
    { Setlist: "Set6", movelist: ["x1_x1", "x2_x2", "x3_x3", "x4_x4",  "y1_y1", "y2_y2",  "y3_y3", "y4_y4"], correct_response: 4, feedback: "高亮标记的是正确答案，因为这三张图片都包含螺旋形。"},
    { Setlist: "Set6", movelist: ["x1_x3", "x2_y1", "x3_y3", "x4_x1",  "y1_y2", "y2_y4",  "y3_x2", "y4_x4"], correct_response: 3, feedback: "高亮标记的是正确答案，因为这三张图片都包含圆形。"},
    { Setlist: "Set6", movelist: ["x1_x3", "x2_y3", "x3_y2", "x4_x4",  "y1_x2", "y2_y4",  "y3_y1", "y4_x1"], correct_response: 2, feedback: "高亮标记的是正确答案，因为这三张图片都有 8 个装饰元素。"},
]

}


// List of images to be preloaded
var images = [
    'assets/Set1/prompt_1.png','assets/Set1/x1.png','assets/Set1/x2.png','assets/Set1/x3.png','assets/Set1/x4.png','assets/Set1/y1.png','assets/Set1/y2.png','assets/Set1/y3.png','assets/Set1/y4.png',
    'assets/Set2/prompt_1.png','assets/Set2/x1.png','assets/Set2/x2.png','assets/Set2/x3.png','assets/Set2/x4.png','assets/Set2/y1.png','assets/Set2/y2.png','assets/Set2/y3.png','assets/Set2/y4.png',
    'assets/Set3/prompt_1.png','assets/Set3/x1.png','assets/Set3/x2.png','assets/Set3/x3.png','assets/Set3/x4.png','assets/Set3/y1.png','assets/Set3/y2.png','assets/Set3/y3.png','assets/Set3/y4.png',
    'assets/Set4/prompt_1.png','assets/Set4/x1.png','assets/Set4/x2.png','assets/Set4/x3.png','assets/Set4/x4.png','assets/Set4/y1.png','assets/Set4/y2.png','assets/Set4/y3.png','assets/Set4/y4.png',
    'assets/Set5/prompt_1.png','assets/Set5/x1.png','assets/Set5/x2.png','assets/Set5/x3.png','assets/Set5/x4.png','assets/Set5/y1.png','assets/Set5/y2.png','assets/Set5/y3.png','assets/Set5/y4.png',
    'assets/Set6/prompt_1.png','assets/Set6/x1.png','assets/Set6/x2.png','assets/Set6/x3.png','assets/Set6/x4.png','assets/Set6/y1.png','assets/Set6/y2.png','assets/Set6/y3.png','assets/Set6/y4.png',
];
var preload = {
    type: 'preload',
    images: images
}
