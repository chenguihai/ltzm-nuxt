const templates = {
    qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
    qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
    weibo: 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
    wechat: 'javascript:',
    douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
};
// const platforms = Object.keys(templates);

class SocialShare {
    static platforms = Object.keys(templates);
    constructor() {
        this.shareUrl = '';
        this.support = SocialShare.platforms.includes(platform);
        this.platform = '';
    }
    createUrl() {
        
    }

    doShare(platform) {
        window.open(this.shareUrl)
    }

    render() {
        
    }
}

function socialShare() {
    return new SocialShare()
}

export default SocialShare;