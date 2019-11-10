const parser = require('node-xlsx');
const fs = require('fs');
const mapToQuiz = [
    {
        name: '所属学校',
        map: [
            '海大', '山大青岛', '青科', '青农', '恒星学院', '青大'
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
            '大一', '大二', '大三', '大四',
        ]
    },
    {
        name: '学课类型',
        map: [
            '理科类', '工科类', '文史类', '社科类'
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
            '销毁', '不处理'
        ]
    },
    {
        name: '是否留意手机APP对权限的申请',
        map: [
            '销毁', '不处理'
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
            '是', '否'
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
    {
        name: '个人是否有过信息泄露的经历',
        map: {}
    },
    {
        name: '遭受信息泄露的途径',
        type: 'list',
        isSkippable: true,
        map: {}
    },
    {
        name: '认为会有哪些损失',
        type: 'list',
        map: {}
    },
    {
        name: '最终如何处理个人信息泄露带来的结果',
        type: 'list',
        map: {}
    },
    {
        name: '认为个人信息泄露的原因有哪些',
        type: 'list',
        map: {}
    },
];
const path = './source_data.xls';

let [{'data': list}] = parser.parse(path);

list.splice(0, 1);

let schoolList = {};
let sexList = {};
let gradeList = {};

// 根据学校统计
for (let dataItem of list) {
    // for(let index = 0; index < dataItem.length - 10; ) {
    //     let item = dataItem[index];
    //     if(index >= 4) {
    //         console.log(index);
    //         console.log(mapToQuiz[index].type);
    //         if(mapToQuiz[index].type === 'list') {
    //             // if(mapToQuiz[index].isSkippable) {
    //             //     if(!(schoolList[dataItem[0]][index]['map'])[index]) {
    //             //         (schoolList[dataItem[0]][index]['map'])[index] = 0;
    //             //     }
    //             //     (schoolList[dataItem[0]][index]['map'])[index]++;
    //             //     index += mapToQuiz[index].map.length;
    //             // }
    //             for(let tempIndex = 1; tempIndex <= mapToQuiz[index].map.length; tempIndex++) {
    //                 if(item[tempIndex - 1 + index] === 1) {
    //                     if(!(schoolList[dataItem[0]][index]['map'])[tempIndex]) {
    //                         (schoolList[dataItem[0]][index]['map'])[tempIndex] = 0;
    //                     }
    //                     (schoolList[dataItem[0]][index]['map'])[tempIndex]++;
    //                 }
    //             }
    //             index += mapToQuiz[index].map.length;
    //         } else {
    //             (schoolList[dataItem[0]][index]['map'])[index]++;
    //             index++;
    //         }
    //     }else if(index === 0) {
    //         if(!(schoolList.hasOwnProperty(item))) {
    //             schoolList[item] = JSON.parse(JSON.stringify(initList));
    //             schoolList[item]['count'] = 0;
    //         }
    //         schoolList[item]['count'] += 1;
    //         index++;
    //     }else {
    //         index++;
    //     }
    // }
    let index = 0;
    for (let quizItem of mapToQuiz) {
        let item = dataItem[index];
        let quizIndex = mapToQuiz.indexOf(quizItem) - 4;
        if (index === 0) {
            if (!(schoolList.hasOwnProperty(item))) {
                schoolList[item] = JSON.parse(JSON.stringify(initList));
                schoolList[item]['count'] = 0;
            }
            schoolList[item]['count'] += 1;
        } else if(index >= 4) {
            if(quizItem.type === 'list') {
                //列表问题的逻辑
                if(!quizItem.isSkippable) {
                    //不可跳过的列表
                    for(let selection of quizItem.map) {
                        if(!schoolList[dataItem[0]][quizIndex]['map'][selection]) {
                            schoolList[dataItem[0]][quizIndex]['map'][selection] = 0;
                        }
                        if(dataItem[index] === 1) {
                            schoolList[dataItem[0]][quizIndex]['map'][selection]++;
                        }
                        index++;
                    }
                }else {
                    if(!schoolList[dataItem[0]][quizIndex]['map'][item]) {
                        schoolList[dataItem[0]][quizIndex]['map'][item] = 0;
                    }
                    if(item === 3) {
                        //如果为2 则跳过
                        schoolList[dataItem[0]][quizIndex]['map'][item]++;
                        index += quizItem.map.length + mapToQuiz[quizIndex + 1].map.length;
                    } else {
                        //为 1 进行循环
                        for(let selection of quizItem.map) {
                            if(!schoolList[dataItem[0]][quizIndex]['map'][selection]) {
                                schoolList[dataItem[0]][quizIndex]['map'][selection] = 0;
                            }
                            if(dataItem[index] === 1) {
                                schoolList[dataItem[0]][quizIndex]['map'][selection]++;
                            }
                            index++;
                        }
                        for(let selection of mapToQuiz[quizIndex + 1].map) {
                            if(!schoolList[dataItem[0]][quizIndex]['map'][selection]) {
                                schoolList[dataItem[0]][quizIndex]['map'][selection] = 0;
                            }
                            if(dataItem[index] === 1) {
                                schoolList[dataItem[0]][quizIndex]['map'][selection]++;
                            }
                            index++;
                        }
                    }
                }
            }else {
                // 单个问题的逻辑
                if(!schoolList[dataItem[0]][quizIndex]['map'][item]) {
                    schoolList[dataItem[0]][quizIndex]['map'][item] = 0;
                }
                schoolList[dataItem[0]][quizIndex]['map'][item]++;
            }
        }
        index++;
    }
}
// console.log(JSON.stringify(schoolList));
try {
    fs.writeFileSync('./schoolResult.json', JSON.stringify(schoolList));
} catch (e) {
    console.log(e);
}
