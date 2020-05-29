/*-----------------------发布线索-----------------------*/
import request from '@/plugins/service';
let apiUrl = '/api'
let urlArr = {
    /*发布线索数据*/
    releaseData:`/user/clue/show`,
    addReleaseData:`/user/clue/add`,
    editReleaseData:`/user/edit/`,
}
/*--------获取发布线索数据----------*/
// export const release = {
//     getInfo:() => {
//         return request({
//             url: urlArr.releaseData,
//             method: 'get'
//         })
//     },
//     addReleaseData:(data) => {
//         return comReq(post({ url: urlArr.addReleaseData, data }))
//     },
//     editReleaseData:(id) => {
//         return request({
//             url: urlArr.editReleaseData + id,
//             method: 'get'
//         })
//     },
// }
export const getInfo = () => {
    return request ({
      url: '/user/clue/show',
      method: 'get',
      
    });
  };export const addReleaseData = data => {
    return request ({
      url: '/user/clue/add',
      method: 'post',
      data,
    });
  };export const editReleaseData = id => {
    return request ({
      url: '/user/edit/',
      method: 'get',
      data:{
          id:id
        }
    });
  };
