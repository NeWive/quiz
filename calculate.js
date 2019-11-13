/***
 * author: NeWive
 * @key_tools NodeJs, npm
 * @usage
 * if it's your first time to use it, please run npm install first
 * After successfully install the dependencies, you can just run it
 */
const parser = require('node-xlsx');
const fs = require('fs');
const mapToQuiz = [
    {
        name: '所属学校',
        map: [
            '海大', '山大青岛', '青科', '青农', '恒星学院', '青大', '其他'
        ],
    },
    {
        name: '性别',
        map: [
            '男', '女'
        ],
    },
    {
        name: '年级',
        map: [
            '大一', '大二', '大三', '大四', '其他'
        ]
    },
    {
        name: '学课类型',
        map: [
            '理科类', '工科类', '文史类', '社科类', '其他'
        ]
    },
    {
        name: '在何处留下信息',
        type: 'list',
        map: [
            '购物网站', '社交网站', '培训机构', '实体商户', '其他'
        ]
    },
    {
        name: '留下过什么类型的信息',
        type: 'list',
        map: [
            '身份信息', '联络方式', '财产信息', '位置信息', '社会关系信息', '其他'
        ]
    },
    {
        name: '是否定期清理网络痕迹',
        map: [
            '是', '否'
        ]
    },
    {
        name: '如何处理留有个人信息的物件',
        map: [
            '先进行信息销毁再处理', '不处理'
        ]
    },
    {
        name: '是否留意手机APP对权限的申请',
        map: [
            '是', '否'
        ]
    },
    {
        name: '是否会阅读软件的隐私条款',
        map: [
            '是', '否'
        ]
    },
    {
        name: '是否使用公共场所的免费WIFI',
        map: [
            '是', '否'
        ]
    },
    {
        name: '是否在使用公共设备后及时删除个人信息',
        map: [
            '是', '否'
        ]
    },
    {
        name: '是否参与扫码送礼品',
        map: [
            '是', '否'
        ]
    },
    {
        name: '对我国个人信息相关的法律是否有过了解',
        map: [
            '熟知', '大概了解', '不了解'
        ]
    },
    {
        name: '学校是否开展过个人信息相关的课程',
        map: [
            '是', '否'
        ]
    },
    {
        name: '个人是否有过信息泄露的经历',
        map: [
            '是', '否'
        ]
    },
    {
        name: '遭受信息泄露的途径',
        type: 'list',
        isSkippable: true,
        map: [
            '推销电话','骚扰短信', '诈骗电话', '垃圾邮件', '账号被盗', '其他'
        ]
    },
    {
        name: '认为会有哪些损失',
        type: 'list',
        isSkippable: true,
        map: [
            '财产损失', '精神损失', '人身损失', '其他损失'
        ]
    },
    {
        name: '最终如何处理个人信息泄露带来的结果',
        type: 'list',
        map: [
            '置之不理', '在社交媒体上口吐芬芳', '直接拉黑', '寻求法律救助', '其他'
        ]
    },
    {
        name: '认为个人信息泄露的原因有哪些',
        type: 'list',
        map: [
            '个人意识不强', '司法缺失', '信息维护人员失职', '其他'
        ]
    },
];
let initList = [
    {
        name: '在何处留下信息',
        type: 'list',
        map: {}
    },
    {
        name: '留下过什么类型的信息',
        type: 'list',
        map: {}
    },
    {
        name: '是否定期清理网络痕迹',
        map: {}
    },
    {
        name: '如何处理留有个人信息的物件',
        map: {}
    },
    {
        name: '是否留意手机APP对权限的申请',
        map: {}
    },
    {
        name: '是否会阅读软件的隐私条款',
        map: {}
    },
    {
        name: '是否使用公共场所的免费WIFI',
        map: {}
    },
    {
        name: '是否在使用公共设备后及时删除个人信息',
        map: {}
    },
    {
        name: '是否参与扫码送礼品',
        map: {}
    },
    {
        name: '对我国个人信息相关的法律是否有过了解',
        map: {}
    },
    {
        name: '学校是否开展过个人信息相关的课程',
        map: {}
    },
    // {
    //     name: '个人是否有过信息泄露的经历',
    //     map: {}
    // },
    // {
    //     name: '遭受信息泄露的途径',
    //     type: 'list',
    //     isSkippable: true,
    //     map: {}
    // },
    // {
    //     name: '认为会有哪些损失',
    //     type: 'list',
    //     isSkippable: true,
    //     map: {}
    // },
    // {
    //     name: '最终如何处理个人信息泄露带来的结果',
    //     type: 'list',
    //     map: {}
    // },
    // {
    //     name: '认为个人信息泄露的原因有哪些',
    //     type: 'list',
    //     map: {}
    // },
];
const path = './source_data.xls';
let schoolList = {};
let sexList = {};
let gradeList = {};
let majorList = {};

let [{'data': list}] = parser.parse(path);
list.splice(0, 1);

// 根据学校统计
// function calculate (keyIndex, targetList) {
//     // for (let dataItem of list) {
//     //     let index = 0;
//     //     // for (let quizItem of mapToQuiz) {
//     //     //     let item = dataItem[index];
//     //     //     let quizIndex = mapToQuiz.indexOf(quizItem) - 4;
//     //     //     if (index === keyIndex) {
//     //     //         if (!(targetList.hasOwnProperty(item))) {
//     //     //             targetList[item] = JSON.parse(JSON.stringify(initList));
//     //     //             targetList[item]['count'] = 0;
//     //     //         }
//     //     //         targetList[item]['count'] += 1;
//     //     //     } else if(index >= 4) {
//     //     //         let metaItem = targetList[dataItem[keyIndex]];
//     //     //         if(quizItem.type === 'list') {
//     //     //             //列表问题的逻辑
//     //     //             if(!quizItem.isSkippable) {
//     //     //                 //不可跳过的列表
//     //     //                 for(let selection of quizItem.map) {
//     //     //                     if(!metaItem[quizIndex]['map'][selection]) {
//     //     //                         metaItem[quizIndex]['map'][selection] = 0;
//     //     //                     }
//     //     //                     if(dataItem[index] === 1) {
//     //     //                         metaItem[quizIndex]['map'][selection]++;
//     //     //                     }
//     //     //                     index++;
//     //     //                 }
//     //     //             }else {
//     //     //                 if(dataItem[15] === 2) {
//     //     //                     //如果为3 则跳过
//     //     //                     index += quizItem.map.length;
//     //     //                     if(!metaItem[quizIndex]['map'][item]) {
//     //     //                         metaItem[quizIndex]['map'][item] = 0;
//     //     //                     }
//     //     //                 } else {
//     //     //                     //为 1 进行循环
//     //     //                     index++;
//     //     //                     for(let selection of quizItem.map) {
//     //     //                         if(!metaItem[quizIndex]['map'][selection]) {
//     //     //                             metaItem[quizIndex]['map'][selection] = 0;
//     //     //                         }
//     //     //                         if(dataItem[index] === 1) {
//     //     //                             metaItem[quizIndex]['map'][selection]++;
//     //     //                         }
//     //     //                         index++;
//     //     //                     }
//     //     //                 }
//     //     //             }
//     //     //             continue;
//     //     //         }else {
//     //     //             // 单个问题的逻辑
//     //     //             if(!metaItem[quizIndex]['map'][mapToQuiz[quizIndex + 4]['map'][item - 1]]) {
//     //     //                 metaItem[quizIndex]['map'][mapToQuiz[quizIndex + 4]['map'][item - 1]] = 0;
//     //     //             }
//     //     //             metaItem[quizIndex]['map'][mapToQuiz[quizIndex + 4]['map'][item - 1]]++;
//     //     //         }
//     //     //     }
//     //     //     index++;
//     //     // }
//     // }
//     console.log(list)
// }
function calculate(keyIndex, targetList) {
    for(let item of list) {
        let count = 0;
        for(let index = 0; index < 13; index++) {
            if(index === keyIndex) {
                if(!targetList.hasOwnProperty(item[index])) {
                    targetList[item[index]] = {};
                }
            } else if(index >= 4) {
                if(item[index] === 1) {
                    count++;
                }
            }
        }
        if(!(targetList[item[keyIndex]].hasOwnProperty(count))) {
            targetList[item[keyIndex]][count] = 0;
        }
        targetList[item[keyIndex]][count] = targetList[item[keyIndex]][count] + 1;
    }
}

function writeFile (filename, targetList) {
    try {
        fs.writeFileSync(`./${filename}.json`, JSON.stringify(targetList));
    } catch (e) {
        console.log(e);
    }
}
//
calculate(0, schoolList);
writeFile('school_total', schoolList);
calculate(1, sexList);
writeFile('sex_total', sexList);
calculate(2, gradeList);
writeFile('grade_total', gradeList);
calculate(3, majorList);
writeFile('major_total', majorList);

