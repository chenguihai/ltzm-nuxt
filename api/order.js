import request from '~/plugins/service'

// 提交补充需求
export const submitSupplement = params => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/addSupplement',
    // 		data: params
    // 	})
    // })
    return request({
        url: '/service/addSupplement',
        method: 'post',
        data: params
    });
}

// 申请退款
export const applyRefund = params => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/applyRefund',
    // 		data: params
    // 	})
    // })
    return request({
        url: '/service/applyRefund',
        method: 'post',
        data: params
    });
}

// 获取资金结算阶段
export const getPhase = order_sn => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/fundSettlementInfo',
    // 		data: {
    // 			order_sn
    // 		}
    // 	})
    // })
    return request({
        url: '/service/fundSettlementInfo',
        method: 'post',
        data: {
            order_sn
        }
    });
}

/**
 * @Description: 支付结算阶段
 * @param {
 *      order_sn	是	string	订单号
 *      verification_key	是	string	发短信时返回的key值
 *      verification_code	是	int	验证码
 *      stage_id	是	int	本次结算阶段id
 *    }
 * @return:
 * @Date: 2019-11-02 21:10:48
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const payPhase = params => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/fundSettlement',
    // 		data: params
    // 	})
    // })
    return request({
        url: '/service/fundSettlement',
        method: 'post',
        data: params
    });
}

//资金结算短信验证码
export const sendPhaseCode = mobile => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/sendSettlementCode',
    // 		data: { mobile }
    // 	})
    // })
    return request({
        url: '/service/sendSettlementCode',
        method: 'post',
        data: {
            mobile
        }
    });
}

//申请发票
export const applyInvoice = params => {
    // 数据标准化
    // params.province = params.province.split(';')[0]
    // params.city = params.city.split(';')[0]

    // 区分个人企业
    // if (params.type === 1) {
    // 	// 个人信息字段转换
    // 	params.company_name = params.personal_name
    // }
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/applyInvoice',
    // 		data: params
    // 	})
    // })
    return request({
        url: '/service/applyInvoice',
        method: 'post',
        data: params
    });
}

/**
 * @Description: 评价服务
 * @param {
 * 参数名	必选	类型	说明
 * order_sn	是	string	订单号
 * type	是	int	1:雇主评价 2：服务商评价
 * attitude	否	int	服务态度
 * speed	否	int	工作速度
 * quality	否	int	完成质量
 * evaluate	是	int	1是好评 2是中评 3是差评
 * text	是	string	评价内容
 * }
 * @return:
 * @Date: 2019-11-03 21:04:06
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const sendComments = params => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/comments',
    // 		data: params
    // 	})
    // })
    return request({
        url: '/service/comments',
        method: 'post',
        data: params
    });
}

/**
 * @Description: 提交解释
 * @param {
 * 参数名	必选	类型	说明
 * order_sn	是	string	订单号
 * explain	是	string	解释内容
 * }
 * @return:
 * @Date: 2019-11-03 21:55:28
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const sendExplain = params => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/explain',
    // 		data: params
    // 	})
    // })
    return request({
        url: '/service/explain',
        method: 'post',
        data: params
    });
}

// 获取工作稿件
export const getServiceFiles = order_sn => {
    // return reqStatus({
    // 	req: post({
    // 		url: '/service/getServiceFiles',
    // 		data: { order_sn }
    // 	})
    // })
    return request({
        url: '/service/getServiceFiles',
        method: 'post',
        data: {
            order_sn
        }
    });
}

// 服务商上传文件
export const sendFiles = (data, onUploadProgress) => {
        // return reqStatus({
        // 	req: post({ url: '/service/uploadFiles', data, forms: 1, onUploadProgress })
        // })
        return request({
            url: '/service/uploadFiles',
            method: 'post',
            data,
            forms: 1,
            onUploadProgress
        });
    }
    // 获取上传稿件的临时地址
export const viewFiles = (id, way) => {
        // return reqStatus({
        // 	req: post({ url: '/service/viewFile', data: { id, way } })
        // })
        return request({
            url: '/service/viewFile',
            method: 'post',
            data: {
                id,
                way
            }
        });
    }
    /**
     * @Description: 雇主关闭需求
     * @param {
     * 参数名	必选	类型	说明
     * order_sn	是	string	订单号
     * reason_id	是	int	关闭原因id
     * text	否	string	关闭原因，关闭原因为其他时填写}
     * @return:
     * @Date: 2019-11-04 15:31:54
     * @LastEditors: Eve
     * @LastEditTime: Do not edit
     */
export const closeService = data => {
        // return reqStatus({
        // 	req: post({ url: '/service/cancelOrder', data })
        // })
        return request({
            url: '/service/cancelOrder',
            method: 'post',
            data,
        });
    }
    // 接收订单
export const acceptOrder = data => {
    // return reqStatus({
    // 	req: post({ url: '/service/signBill', data })
    // })
    return request({
        url: '/service/signBill',
        method: 'post',
        data,
    });
}

// 订单删除文件
export const removeFile = async id => {
        // return reqStatus({
        //     req: post({
        //         url: '/service/deleteFile',
        //         data: {
        //             id
        //         }
        //     })
        //     // extrajudicial: { code: 1 }
        // })
        return request({
            url: '/service/deleteFile',
            method: 'post',
            data: {
                id
            }
        }).catch(e => console.error('delFile:', e))
    }
    // 普通删除文件
export const delFile = async rmfile => {
    // return reqStatus({
    //     req: post({
    //         url: '/admin/removeFile',
    //         data: {
    //             rmfile
    //         }
    //     }),
    //     extrajudicial: {
    //         code: 1
    //     }
    // })
    return request({
        url: '/admin/removeFile',
        method: 'post',
        data: {
            id
        },
        extrajudicial: {
            code: 1
        }
    }).catch(e => console.error('delFile:', e))
}

// 申请验收
export const applyPay = order_sn => {
    // return reqStatus({
    // 	req: post({ url: '/service/applyPayment', data: { order_sn } })
    // })
    return request({
        url: '/service/applyPayment',
        method: 'post',
        data: {
            order_sn
        }
    });
}

/**
 * @Description: 获取订单/服务 详情
 * @param {order_sn|String}
 * @return:
 * @Date: 2019-10-30 15:45:44
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

// export const getOrderDetailClient = async order_sn => {
// 	return reqStatus({
// 		req: post({
// 			url: '/service/orderInfo',
// 			data: {
// 				order_sn
// 			}
// 		})
// 	})
// }
export const getOrderDetailClient = async order_sn => {
    return request({
        url: '/service/orderInfo',
        method: 'post',
        data: {
            order_sn
        }
    });
};
/**
 * @Description: 获取阶段信息
 * @param {type}
 * @return:
 * @Date: 2019-11-18 10:05:00
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const getPhaseClient = async order_sn => {
    // return reqStatus({
    // 	req: post({
    // 		url: `/service/fundSettlementInfo`,
    // 		data: {
    // 			order_sn
    // 		}
    // 	})
    // })
    return request({
        url: '/service/fundSettlementInfo',
        method: 'post',
        data: {
            order_sn
        }
    });
}

/**
 * @Description: 绑定账户
 * @param {
 * username	是	int	账户
 * password	是	int	密码
 * wechatid or qqid	是	int	微信qqID
 * }
 * @return:
 * @Date: 2019-12-02 19:02:55
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const bindUser = async data => {
        // return reqStatus({
        // 	req: post({
        // 		url: `/member/thirdparty/authorizations`,
        // 		data
        // 	})
        // })
        return request({
            url: '/member/thirdparty/authorizations',
            method: 'post',
            data
        });
    }
    /**
     * @Description: 第三方注册
     * @param {
     * username	是	int	账户
     * password	是	int	密码
     * wechatid or qqid	是	int	微信qqID
     * }
     * @return:
     * @Date: 2019-12-02 19:02:55
     * @LastEditors: Eve
     * @LastEditTime: Do not edit
     */
export const bindRegUser = async data => {
    // return reqStatus({
    // 	req: post({
    // 		url: `/member/thirdparty/registered`,
    // 		data
    // 	})
    // })
    return request({
        url: '/member/thirdparty/registered',
        method: 'post',
        data
    });
}