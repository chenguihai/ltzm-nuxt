<template>
  <div>
    <div class="search">
      <p>
        <i></i>
        <span>浏览人数</span>
        <strong>500人</strong>
      </p>
      <p>
        <i></i>
        <span>购买人数</span>
        <strong>18人</strong>
      </p>
      <hr />
      <nuxt-link to="/clues/release">
        <button>发布类似线索</button>
      </nuxt-link>
      <hr />
    </div>
    <div class="other">
      <h4>
        <span>该雇主的其他线索</span>
        <nuxt-link to="/">更多></nuxt-link>
      </h4>
      <ul class="list">
        <li class="item" v-for="item in 4" :key="item">
          <p>￥10000.00</p>
          <nuxt-link to="/" class="inner-item">
            <span>找高速广告公交广啊啊啊啊啊啊啊啊啊啊啊啊啊</span>
            <span>00人购买线索</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="less">
.search {
  border: 1px solid #e9e9e9;
  background: #fff;
  padding: 20px;

  p:nth-child(1) {
    display: flex;

    i {
      height: 16px;
      margin-right: 0.5em;
      width: 30px;
    }
  }

  p:nth-child(2) {
    padding-top: 12px;
    padding-bottom: 20px;
    display: flex;

    i {
      height: 16px;
      width: 30px;
      margin-right: 0.5em;
    }
  }

  hr {
    border: none;
    height: 1px;
    background-color: #dfdfdf;
    margin-bottom: 20px;
  }

  button {
    margin-bottom: 20px;
    border: 1px solid #dfdfdf;
    background: none;
    width: 206px;
    height: 42px;
    color: #666;

    &:hover {
      background: #e9e9e9;
      border: 1px solid rgba(223, 223, 223, 1);
    }
  }
}

.other {
  border: 1px solid #e9e9e9;
  background: #fff;
  margin-top: 20px;
  h4 {
    padding-left: 20px;
    padding-right: 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    background: #f8f8f8;
    color: #666666;

    span {
      font-weight: normal;
    }

    a {
      color: #999;
    }
  }
  .list {
    .item {
      margin-left: 20px;
      padding-bottom: 10px;
      padding-top: 10px;
      padding-right: 20px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);

      p {
        color: rgba(243, 38, 45, 1);
        line-height: 28px;
      }

      .inner-item {
        font-size: 12px;
        display: flex;
        text-decoration-line: none;
        justify-content: space-between;

        span:nth-child(1) {
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #0066cc;
          font-size: 12px;
        }

        span:nth-child(2) {
          text-align: right;
          flex: 1.5;
          font-size: 12px;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .item:nth-last-child(1) {
      border: none;
    }
  }
}
</style>