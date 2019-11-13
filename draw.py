import matplotlib.pyplot as plot
import json

keyMaps = {
    'school': [
        './school.json', '海大', '山大青岛', '青科', '青农', '恒星学院', '青大', '其他'
    ],
    'sex': [
        './sex.json', '男', '女'
    ],
    'grade': [
        './grade.json', '大一', '大二', '大三', '大四', '其他'
    ],
    'major': [
        './major.json', '理科类', '工科类', '文史类', '社科类', '其他'
    ]
}

# 解决乱码问题
plot.rcParams['font.sans-serif'] = ['SimHei']
plot.rcParams['axes.unicode_minus'] = False


def handle_result(key):
    with open(keyMaps[key][0], 'r', encoding='utf-8') as j:
        source = json.load(j)
    key_list = source.keys()
    mapToQuiz = [
        {
            "name": '在何处留下信息',
            "type": 'list',
            "answer": {

            },
            "map": [
                '购物网站', '社交网站', '培训机构', '实体商户', '其他'
            ],
            "pearson": {

            }
        },
        {
            "name": '留下过什么类型的信息',
            "type": 'list',
            "answer": {

            },
            "map": [
                '身份信息', '联络方式', '财产信息', '位置信息', '社会关系信息', '其他'
            ],
            "pearson": {

            }
        },
        {
            "name": '是否定期清理网络痕迹',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '如何处理留有个人信息的物件',
            "answer": {

            },
            "map": [
                '先进行信息销毁再处理', '不处理'
            ],
            "pearson": {

            }
        },
        {
            "name": '是否留意手机APP对权限的申请',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '是否会阅读软件的隐私条款',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '是否使用公共场所的免费WIFI',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '是否在使用公共设备后及时删除个人信息',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '是否参与扫码送礼品',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '对我国个人信息相关的法律是否有过了解',
            "answer": {

            },
            "map": [
                '熟知', '大概了解', '不了解'
            ],
            "pearson": {

            }
        },
        {
            "name": '学校是否开展过个人信息相关的课程',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '个人是否有过信息泄露的经历',
            "answer": {

            },
            "map": [
                '是', '否'
            ],
            "pearson": {

            }
        },
        {
            "name": '遭受信息泄露的途径',
            "type": 'list',
            "answer": {

            },
            "map": [
                '推销电话', '骚扰短信', '诈骗电话', '垃圾邮件', '账号被盗', '其他'
            ],
            "pearson": {

            }
        },
        {
            "name": '认为会有哪些损失',
            "type": 'list',
            "answer": {

            },
            "map": [
                '财产损失', '精神损失', '人身损失', '其他损失'
            ],
            "pearson": {

            }
        },
        {
            "name": '最终如何处理个人信息泄露带来的结果',
            "type": 'list',
            "answer": {

            },
            "map": [
                '置之不理', '在社交媒体上口吐芬芳', '直接拉黑', '寻求法律救助', '其他'
            ],
            "pearson": {

            }
        },
        {
            "name": '认为个人信息泄露的原因有哪些',
            "type": 'list',
            "answer": {

            },
            "map": [
                '个人意识不强', '司法缺失', '信息维护人员失职', '其他'
            ],
            "pearson": {

            }
        },
    ]

    for quiz_item in mapToQuiz:
        for selection_item in quiz_item['map']:
            quiz_item['answer'][selection_item] = {}
            init_pearson_list = []
            for key_item in key_list:
                quiz_item['answer'][selection_item][key_item] = source[key_item][mapToQuiz.index(quiz_item)]["map"][
                    selection_item]
        # if quiz_item.has_key('list'):


    with open('./'+ key + '_result.json', 'w+') as f:
        f.write(json.dumps(mapToQuiz, ensure_ascii=False))

# 画图 遍历父key
# for item in source:
#     plot.title(item)
#     for q:uiz in source[item]:
#         "name" = quiz['"name"']
#     "answer": {
#     labels, =: quiz['
#         "map"'].keys()
#     "answer": {
#     values, = quiz['
#         "map"'].values()
#         plot.title(keyMaps[key][int(item)] + ' ' + "name")
#         plot.pie(values, labels=labels, autopct='%1.1f%%', shadow=False, startangle=90)
#         plot.savefig('./pie/' + keyMaps[key][int(item)] + '_' + "name" + '.png')
#         plot.close('all')


handle_result('school')
handle_result('sex')
handle_result('grade')
handle_result('major')
