import request from '@/plugins/service'


export const cluesOrderDetail = async (store, data) => {
    return await request({
        url:'/api/user/cluesn',
        method:'POST',
        data
    })
}
