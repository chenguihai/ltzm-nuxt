import request from '@/plugins/service'

export const requestInvite = (page) => { //退还保证金状态检测
    return request({
        url: '/user/invite/list?page=' + page,
        method: 'get',
    })
}

export const requestCode = (id) => { //邀请码入驻
    return request({
        url: '/user/invite/code',
        method: 'post',
        data: { inviteUserId: id }
    })
}