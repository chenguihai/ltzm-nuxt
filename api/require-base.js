import request from '@/plugins/service';
// export const indexDataInit = data => {
// 	return reqStatus({
// 		req: post({
// 			url: '/index',
// 			data
// 		})
// 	})
// }
export const indexDataInit = data => {
    return request ({
      url: '/index',
      method: 'post',
      data: data,
    });
  };
