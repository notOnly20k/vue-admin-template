const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    'title|1': ['足球比赛', '篮球比赛', '乒乓球比赛'],
    'status|1': ['未发布', '进行中', '已结束'],
    endTime: '@datetime',
    leaderTime: '@datetime',
    registrationSchool: '16所学校',
    registrationStudent: '324位学生',
    location: '北京工体'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/gameManage/list',
    type: 'get',
    response: config => {
      const { title, type, endTime, page = 1, limit = 20, status } = config.query
      const mockList = data.items.filter(item => {
        if (type && item.type !== type) return false
        if (endTime && item.endTime !== endTime) return false
        if (status && item.status !== status) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      const items = pageList
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: items
        }
      }
    }
  }
]
