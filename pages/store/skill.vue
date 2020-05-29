<template>
    <div>
    <div class="store-banner-main"></div>
    <div class="service_center">
        <skill-side/>
        <div class="skill-content">
            <h3>完善类目</h3>
            <div class="skill_top">
                <div>
                    <strong>类目入驻</strong>
                    <p>面向于服务的类目</p>
                    <p>我已选择：<span>{{settledIn.enteredNum}}</span>个</p>
                </div>
                <div>
                    <nuxt-link to="/tollMarket/marketShop/marketShop?id=1" target="_blank">
                        <img height="100%" width="100%" src="~assets/img/skill.png" alt="">
                    </nuxt-link>
                </div>
            </div>
            <p class="skill_count">
                你已经入驻<span class="enterNum">{{settledIn.enteredNum}}</span>个一级类目，还可以再入驻<span class="remain">{{settledIn.remain}}</span>个一级类目
            </p>
            <div class="skill_search common_form">
                <el-input v-model="searchVal" placeholder="试试输入类目关键词，快速查找相关类目"
                          @keyup.enter.native="searchHandle"></el-input>
                <a href="javascript:;" @click.stop="searchHandle()">类目搜索</a>
                <ul class="skill_ul" v-show="searchShow">
                    <li class="skill_li no-data" v-if="searArr.length==0">暂无数据</li>

                    <li class="skill_li" v-for="(item,index) in searArr" :key="index"
                        @click="searchResultClick(index)">
                        {{item.cate1_name}} <i class="el-icon-arrow-right"></i>
                        {{item.cate2_name}}<i class="el-icon-arrow-right"></i> {{item.cate3_name}}
                    </li>
                </ul>
            </div>
            <!-- 选择的类目-->
            <div class="skill-box">
                <div class="skill_select">
                    <!--一级类目-->
                    <ul class="skill_first">
                        <li v-for="(item,index) in cList1" :key="item.id"
                            :class="{active:(item.entered==1||clickCate1==index)}"
                            @click="handleCat1(index)">
                            <span>{{item.cate_name}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </li>
                    </ul>
                    <!--二级类目-->
                    <ul class="skill_second">
                        <li v-for="(item,index) in cList2" :key="item.id"
                            :class="{active:(item.entered==1||clickCate2==index)}"
                            @click="handleCat2(index)">
                            <span>{{item.cate_name}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </li>
                    </ul>
                    <!--三级类目-->
                    <ul class="skill_third">
                        <!--clickCate3==index-->
                        <li v-for="(item,index) in cList3" :key="item.id"
                            :class="{active:(item.entered==1)}"
                            @click="handleCat3(index)">
                            <span>{{item.cate_name}}</span>
                        </li>
                        <li v-show="cList3.length === 0">无数据</li>
                    </ul>
                </div>
                <div class="skill_list">
                    <p>你已选择的类目：</p>
                    <div class="skill_box">
                        <!--                                item.selected ===1-->
                        <el-button v-for="(item,index) in selectedList" :key="item.id"
                                   :disabled="!!item.selected" @click="handleDeleteCat(index,item.id)"
                                   type="danger" plain>{{item.cate_name}}
                            <svg v-if="item.selected !==1" class="delete_icon" aria-hidden="true">
                                <use xlink:href="#icon-jihuojinengshanchu"></use>
                            </svg>
                        </el-button>
                    </div>
                </div>
            </div>
            <p class="tips1">你可以入驻 1 个一级类目下的多个二级类目及三级类目，如您未保存切换一级类目，之前的选择将会被清空</p>
            <div class="btn_box mt_35 user_select">
                <span class="keep_btn" @click="saveCategory">保存</span>
            </div>
            <h3 class="h3-2">选择您擅长的领域 <span class="text">(不可编辑说明，领域已与服务关联，如需取消请先修改服务领域。)</span></h3>
            <el-checkbox-group @change="selectField" class="chebox-wrap" v-model="fieldArr">
                <!--                        :max="9"-->
                <el-checkbox v-for="(item) in realList" :key="item.id" :label="item.id"
                             :disabled="!!item.selected && item.hasService ==1">
                    {{item.sr_name}}
                </el-checkbox>
            </el-checkbox-group>
            <div class="btn_box skill_padding user_select">
                <span class="keep_btn" @click="realSave">保存</span>
            </div>
            <div class="tips-last">
                <h3>温馨提示：</h3>
                <div class="hint_wrap">
                    <p>你的店铺只能在入驻的类目列表下展示</p>
                    <p>合理设置技能有助于官方更精准的为您派单</p>
                    <p>小主保证金是可以退还的哦，但是退还后所激活的店铺技能属性将会被删除，请小心选择</p>
                </div>
            </div>
            <div class="last-next" v-if="storeInfo.isAuth !==1">
                <p>点击提交后，进入下一个任务（完善认证）</p>
                <!--                        <el-button type="danger" @click="CheckGoNextHandle">下一个任务</el-button>-->
                <div class="btn_box">
                    <span class="next_step" @click="CheckGoNextHandle">下一个任务</span>
                </div>
            </div>
        </div>
        <!--close-on-press-escape点击蒙层不关闭 close-on-press-escape ESC不关闭-->
        <!--入驻须知-->
        <el-dialog title="入驻须知"
                   :center="true"
                   :close-on-click-modal="false"
                   width="744px"
                   custom-class="notice_entry"
                   :close-on-press-escape="false"
                   :visible.sync="noticeEntryFlag">
            <div class="dialog-box">
                <!--            <h2>入驻须知</h2>-->
                <p class="hint_info">您当前入驻的类目有以下信息需要知晓：</p>
                <div class="wrap">
                    <!--left-->
                    <div class="item">
                        <div class="top">
                            <strong>诚信保证金</strong>
                            <nuxt-link to="/aboutUs/regulation/regulation?id=19" target="_blank">了解诚信保证金&gt;</nuxt-link>
                        </div>
                        <div>
                            <div class="item1">
                                <div>
                                    <strong>服务商等级：</strong>
                                    <span>{{storeInfo.shopLevel &&storeInfo.shopLevel.bl_name}}</span>
                                </div>
                                <div class="num">
                                    <strong>店铺赋能技能</strong><span>{{settledInFun}}个</span>
                                </div>
                            </div>
                            <ul class="item2">
                                <li class="cate_li" v-for="(item,idx) in leftList" :key="idx">
                                    <em>{{item.cate_name}}</em>
                                    <span>最低保证金：<i>&yen;{{storeInfo.type_id==1?item.min_deposit_personal:item.min_deposit_enterprise}}</i></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--right-->
                    <div class="item">
                        <div class="top">
                            <strong>技术费率</strong>
                            <nuxt-link to="/help?id=35" target="_blank">了解技术费率&gt;</nuxt-link>
                        </div>
                        <div>
                            <div class="item1">
                                <strong class="num">
                                    技能：{{leftList.length > 0 && leftList[0].cate_name}}
                                </strong>
                            </div>
                            <ul class="item2 right">
                                <li class="item_li" v-for="(item,idx) in rightList" :key="idx">
                                    <em class="name">{{item.cate_name}}</em>
                                    <span class="text">技术费率</span>
                                    <i class="num">{{item.tech_rate}}%</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="settledIn.remain > 0" class="agt">
                    <h3>凌天众媒网服务商入驻协议</h3>
                    <p>
                        本协议由同意并承诺遵守本协议规定且使用凌天众媒网服务的用户（下称“服务商”）、凌天众媒网（运营主体为深圳凌天众媒科技有限公司，下称“平台”）共同缔结，本协议具有合同法律效力。服务商在使用平台相关服务时，须自行阅读本协议。<br>
                        为共同构建诚信、透明的网络消费环境，共同维护公平、规范的网络经营秩序，共同促进平台生态系统的健康持续发展，在本协议约束下平台提供店铺相关服务，服务商在平台开设虚拟店铺正常开展经营活动。服务商需始终恪守诚信经营承诺，积极维护国家法律法规及平台的相关规定，严格遵守平台已经发布、即将发布的各项规则，诚信、公平、规范地开展经营活动。
                    </p>
                    <h4>一、 协议内容及生效</h4>
                    <p>1. 本协议内容包括协议正文及平台所有已发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。<br>
                        2.
                        服务商在使用平台提供的各项服务时，承诺接受并遵守各项相关规则的规定。平台有权单方进行变更本协议内容、调整交易流程、变更交易规则等行为，变更后的协议和规则一经在站内信或公告公布后，立即在站内信或公告明确的特定时间自动生效。若服务商在前述变更站内信或公告后继续使用平台服务的，即表示已经阅读、理解并接受经修订的协议和规则。若服务商不同意相关变更，应当立即停止使用平台服务。
                    </p>
                    <h4>二、定义及解释</h4>
                    <p>
                        入驻：指服务商注册完成，依据平台入驻流程和要求进行开通店铺的过程。<br>
                        诚信保证金：指服务商根据本规则及其它协议缴存并同意冻结于其凌天众媒网账户中，授权凌天众媒网处置的、用于在不能按约提供服务时赔付给雇主或违背凌天众媒网其他管理规定时用于扣除的资金。<br>
                        技术服务费：指平台为服务商提供技术服务、技术支持等，凌天众媒网按照交易金额一定费率向服务商收取的服务费用。
                    </p>
                    <h4>三、服务商入驻条件及证明文件</h4>
                    <p>1. 服务商在平台入驻，须满足以下条件：<br>
                        （1）年满18岁并具有民事权利能力和民事行为能力的自然人或依照中华人民共和国法律注册并领取合法有效的营业执照及其他经营许可的法人或者非法人组织。<br>
                        （2）有良好的信誉，能提供优质服务，有能力履行合同与提供良好的售后服务。<br>
                        （3）同意本协议及平台相关规则。<br>
                        2. 证明文件提交：<br>
                        （1）服务商须根据平台相关规则及要求向平台提交证明文件或其他相关证明，包括但不限于营业执照、法定代表人身份证明（含法定代表人身份证复印件）、行政许可等彩色复印件。<br>
                        （2）服务商保证向平台提供的上述证明文件或其他相关证明真实、合法、准确、有效，并保证上述证明文件或其他相关证明发生任何变更或更新时，及时在平台更新。<br>
                        （3）服务商须根据《中华人民共和国电子商务法》规定的市场主体登记相关要求办理市场主体登记， 按照《中华人民共和国电子商务法》不需要办理市场主体登记的，需要进行说明，并保证说明情况真实。<br>
                        （4）服务商对其提交的证明文件或其他相应证明的真实性、合法性、准确性、有效性承担全部法律责任，若因服务商提交虚假、过期文件或未及时更新证明文件或通知导致纠纷或被相关国家机关处罚的，由服务商独立承担全部法律责任，如因此造成凌天众媒网（包括“凌天众媒网”合作方、代理人或职员）损失的，服务商应予以赔偿。
                    </p>
                    <h4>四、服务商入驻流程</h4>
                    <p>服务商应当完成以下流程，方可在平台正常经营店铺：<br>
                        1.服务商已同意并签署本协议。<br>
                        2.服务商已完善店铺信息（店铺资料和擅长技能必填）。<br>
                        3.服务商已完成店铺实名认证。<br>
                        4.缴纳诚信保证金。<br>
                        5.平台审核。<br>
                        服务商完成以上全部事项并提交，平台对服务商以上全部信息进行审核，审核通过即入驻成功，可开始正常经营；审核未通过进行驳回重新提交资料。</p>
                    <h4>五、平台费用</h4>
                    <p>1. 诚信保证金<br>
                        服务商在完善店铺信息并添加技能类目后需要根据《凌天众媒网诚信保证金规范》中规定的类目诚信保证金进行缴纳对应数额诚信保证金。<br>
                        2.技术服务费<br>
                        技术服务费按照服务商成交订单的项目阶段按次收取，以雇主向服务商确认验收付款为划扣时间节点，即雇主操作“确认验收付款”，平台即按照类目对应的技术费率从服务商获得的收入中予以划扣。 </p>
                    <h4>六、双方权利及义务</h4>
                    <p>1. 服务商在入驻成功后可免费享受平台基础功能及相关服务。<br>
                        2. 服务商应按照平台规定缴纳各项费用。<br>
                        3. 服务商同意并遵守《凌天众媒网服务商管理规范》、《凌天众媒平台服务商发布和出售管理规则》等规则，服务商若违反此类规则，凌天众媒网有权对服务商进行相应处罚。<br>
                        4. 服务商应妥善保管凌天众媒网账号，如因服务商保管、设置或使用不当造成的损失，由服务商自行承担责任。<br>
                        5. 平台根据本协议向服务商提供电子商务交易平台及相应技术支持服务，尽力维护平台的正常稳定运行，并努力改进技术，对平台功能及服务进行更新、升级，不断提升平台性能和交易效率。<br>
                        6. 平台有权将经国家生效法律文书或行政文书确定的服务商违法违规事件，或平台已确认的服务商违反本协议相关约定的事项，在平台上予以公示。<br>
                        7. 平台提供的直接订单或订单机会均必须按照平台交易流程操作，服务商承诺不进行线下交易、虚假交易和出售违法违规的服务。<br>
                        8.
                        服务商保证其所有服务内容应完全符合中国有关法律、法规、行政规章等的规定。如因服务商违反上述规定给平台或者雇主带来任何损害，服务商应承担所有法律责任并赔偿由此给平台或雇主造成的损失。<br>
                        9.
                        平台有权利对服务商提供的相关资质文件及各类信息资料进行审核。审核通过并不代表平台对审核内容的真实性、合法性、准确性、及时性的确认，服务商仍须对其提交的资料的真实性、合法性、准确性、及时性等承担相应的法律责任。<br>
                        10.
                        平台有权对服务商的注册信息、上传的相关数据信息、在平台发布的其他信息及交易行为进行监督检查，对发现的违法违规信息及其相关内容，服务商同意平台不经通知可立即删除，对发现的其他问题或疑问有权向服务商发出询问及要求改正的通知，服务商应在接到通知后立即做出说明或改正。对服务商前述不当行为，平台有权追究其违约、侵权责任并/或解除本协议。<br>
                        11.
                        如因服务商服务内容、发布的信息或提供的售后服务问题而引发雇主对服务商及/或平台的诉讼，平台有权披露服务商为实际服务提供商，服务商应承担因客户诉讼而产生的全部法律责任，如因此而给平台造成损失的，平台有权要求服务商承担赔偿责任。<br>
                        12. 服务商在平台上交易过程中与雇主发生交易纠纷时，一旦服务商或雇主的任一方或双方共同提交平台要求调处，则平台作为独立第三方，有权根据平台相关规定进行处理。<br>
                        13.
                        平台有权要求服务商提供与服务商服务内容、售后服务等相关的信息，以便于雇主直接向平台进行咨询时予以回复，对于平台无法回答或属服务商掌握的情况，平台有权要求服务商在指定的时限内予以回复或给出相应方案，对服务商未及时解决的客户咨询及投诉，平台有权对服务商采取相应处理措施。<br>
                        14. 平台有权按照《凌天众媒网服务商管理规范》的约定或相关规则的规定，对服务商的违规行为进行处罚。<br>
                        15.
                        雇主有权要求服务商开具与“确认支付”金额同等金额的发票，服务商应按照雇主要求向雇主开具发票；服务商有权要求平台按照收取的技术服务费金额开具同等金额的发票，平台应按照服务商要求开具发票。详细规则由《凌天众媒网发票规则》予以规定。<br>
                        16. 平台划扣技术服务费期间，由于系统计算原因可能对服务商造成一定的影响，在此期间服务商将不能够进行提现或使用钱包余额进行付款操作。<br>
                        17.
                        由于系统原因平台未能在雇主确认支付钱包金额中划扣技术服务费的，服务商应保证钱包余额有足够的资金用于平台划扣技术服务费，否则平台有权停止向服务商继续提供服务，直至服务商足额支付技术服务费。<br>
                        18. 服务商自行终止经营店铺时，应当提前三十日联系平台进行关店处理。</p>
                    <h4>七、保密条款</h4>
                    <p>
                        1. 服务商不得向与平台构成商业竞争关系的企业、商业机构或者组织提供其他服务商、雇主及平台的相关信息或者资料，否则服务商应承担一切责任。<br>
                        2. 服务商应告知并督促其因履行本协议之目的而必须获知本协议内容及因合作而获知相关商业秘密的雇员、代理人、顾问等遵守保密条款，并对其雇员、代理人、顾问等的行为承担责任。
                    </p>
                    <h4>八、平台责任范围和责任限制</h4>
                    <p>1.
                        平台将在现有技术的基础上尽合理努力提供相应的安全措施，以保障本协议项下的服务安全和正常运行。但由于可能存在的计算机病毒、网络通讯故障、系统维护等方面的因素，以及可能发生的不可抗力事件，平台在此明确声明，对服务不作任何明示或暗示的保证，包括但不限于对服务的可适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。<br>
                        2.
                        本协议的签署、服务商的入驻并不意味着平台对服务商的身份、履约能力、服务发布、交易等行为或服务商自行上传的信息的真实性、准确性、合法性、有效性和完整性承担任何明示或暗示的保证或担保等责任，也不意味着平台成为服务商与用户之间交易的参与方。因服务商的行为导致的任何投诉、纠纷、争议、赔偿等，服务商应以自己的名义独立承担所有法律责任。<br>
                        3. 平台只是为服务商提供一个信息服务交易的平台，对于雇主所发布的需求的合法性、真实性及其品质，以及服务商履行交易的能力等，平台一律不负任何担保责任。</p>
                    <h4>九、违约责任</h4>
                    <p>1.
                        服务商提供虚假、失效的证明文件（包括其他相关证明）或存在欺诈等不正当行为，平台有权终止本协议并关闭服务商店铺，服务商自行承担一切责任和损失，如因服务商的前述行为对平台或第三方造成损失的，服务商应当承担赔偿责任。<br>
                        2.
                        服务商在平台发布错误、虚假、违法及不良信息，给平台造成任何损失的（损失包括但不限于诉讼费、律师费、赔偿、补偿、行政机关处罚、差旅费等），服务商须应当承担赔偿责任，平台有权从服务商缴纳的诚信保证金和凌天众媒网账户直接扣除，如金额不足的平台有权向服务商继续追偿。<br>
                        3.
                        服务商不论采取何种方式将平台用户吸引到其他平台或场所进行交易或绕开平台指定付款方式进行交易，平台有权终止本协议，并有权关闭服务商在平台的全部店铺，且服务商缴纳的诚信保证金予以没收。<br>
                        4. 服务商不论采取何种方式非法获取平台系统数据，利用平台谋取不正当利益或从事非法活动的， 平台有权终止本协议，并有权关闭服务商在平台的全部店铺，且服务商缴纳的诚信保证金予以没收。<br>
                        5.
                        服务商违反本协议及《凌天众媒网服务商管理规范》等平台规则时，服务商除承担违约责任外，平台有权视情节严重程度采取暂停向服务商提供服务、暂时关闭服务商店铺、暂缓未结算款项直至解除本协议等措施。
                    </p>
                    <h4>十、法律适用及争议解决</h4>
                    <p>本协议及与本协议有关的一切争议、解释等，均适用中华人民共和国法律（不含港澳台地区法律）。<br>
                        本协议发生争议时，应友好协商解决；如果协商不成，双方均同意向深圳仲裁委员会按照该会仲裁规则进行仲裁，仲裁裁决是终局的，对双方均有约束力。</p>
                    <h4>十一、其他约定</h4>
                    <p>1. 本协议的任何一方未能及时行使本协议项下的权利不应被视为放弃该权利。<br>
                        2. 本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本协议的其余条款仍有效并且有约束力。</p>
                    <!--
                    <p class="italic">
                        使用平台相关服务时，须自行阅读本协议，尤其是作出加黑，斜体，下划线处理的相关条款，可能会对您的相关权益造成重大影响，请谨慎阅读。
                    </p>-->
                </div>
                <p v-else class="tips-text">您的技能类目已用完，您可以通过购买技能类目或升级会员扩充技能类目</p>

                <div class="btn_box">
                    <el-button @click="confirmRuleHandle" class="last_btn" type="danger" :class="{'active':!ruleCtr}"
                               :disabled="ruleCtr" :loading="isLoading"
                    >{{ruleText}}
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</div>
</template>
<script>
    import SkillSide from '~/components/store/side';
    import {get_store_info, categorys} from "../../api/store-flow";
    import {mapState, mapMutations} from "vuex";

    export default {
        layout: 'shop-flow-layout',
        components: {SkillSide},
        data() {
            return {
                timer: null,
                ruleCtr: true,
                ruleText: '同意上述规则',
                searArr: [],
                searchShow: false,
                realList: [],//领域列表
                realListTmp: '',
                cList1: null,//分类列表
                cList2: [], //二级类目
                cList3: [],//三级类目
                selectCatOld1: 0,
                selectCatOld2: [],
                selectCatOld3: [],
                selectCat1: 0,
                selectCat2: 0,
                selectCat3: 0,
                clickCate1: -1,//点击的一级
                clickCate2: -1,//点击的二级
                clickCate3: -1,//点击的三级
                leftList: [],// 入驻须知  诚信保证金
                rightList: [],// 入驻须知  技术费率
                selectedList: [],//已选择的类目
                selectArray: [],//保存已选择的数据
                fistSelect: [],//一开始就选择的东西
                saveCate1: [],//已选择的一类目
                oldSelectCate1: [],//已选择的一类目
                newSelectCate1: [],//新选择的一类目
                searchVal: '',
                oldSerachVal: '',
                noticeEntryFlag: false,//false 入驻须知
                count: 0,
                noticeParams: {},//入驻须知的数据
                settledIn: {
                    enteredNum: 0,
                    remain: 0
                },
                fieldArr: [],//领域
                fieldArrOld: [],//领域 old
                isLoading:false
            };
        },
        computed: {
            ...mapState(['storeInfo']),
            'settledInFun': function () {
                const {enteredNum = 0, remain = 0} = this.settledIn;
                return enteredNum + remain;
            }
        },
        watch: {
            searchVal(searchVal) {
                if (!searchVal) {
                    this.searchShow = false
                    this.searArr = []
                }
            }
        },
        mounted() {
            this.realListFn()
            this.cListFn()
            document.onclick = () => {
                this.searchShow = false
                this.searArr = []
            }
        },
        methods: {
            ...mapMutations(['CHANGE_STORE_INFO']),
            selectField(val) {
                if (val.length >= 10) {
                    this.fieldArr = val.slice(0, 9)
                    this.$message.error('最多选择9个服务领域')
                }
            },
            findObjectDifferent(array1, array2) { //找出数组中不同的对象
                let result = [];
                for (let i = 0; i < array2.length; i++) {
                    let obj = array2[i], num = obj.id, isExist = false;
                    for (let j = 0; j < array1.length; j++) {
                        let aj = array1[j], n = aj.id;
                        if (n == num) {
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        result.push(obj);
                    }
                }
                return result;
            },
            findDifferent(array1, array2) { //找出数组中不同的对象
                if (array1.length !== array2.length) {
                    return true
                }
                array1.sort((a, b) => a - b);
                array2.sort((a, b) => a - b);
                for (let i = 0; i < array1.length; i++) {
                    if (array1[i] !== array2[i]) {
                        break
                        return true
                    }
                }
                return false;
            },
            async confirmRuleHandle() { //确定规矩的处理
                if(this.isLoading){return }
                if (this.settledIn.remain >= (this.newSelectCate1.length - this.oldSelectCate1.length)) {//判断是否还可以添加新的一级类目
                    this.isLoading =true;
                    let res = await categorys.addFn(this.noticeParams)
                    let {code, message, data} = res.data
                    if (code == 200) {
                        this.$message.success('添加成功')
                        this.count = 0;   //需要初始化数据
                        this.selectedList = [];//已选择的类目
                        this.selectArray = [];//保存已选择的数据
                        this.fistSelect = [];//一开始就选择的东西
                        this.selectCatOld1 = 0;
                        this.selectCatOld2 = [];
                        this.selectCatOld3 = [];
                        this.selectCat1 = 0;
                        this.selectCat2 = 0;
                        this.selectCat3 = 0;
                        this.clickCate1 = -1;
                        this.clickCate2 = -1;
                        this.clickCate3 = -1;
                        this.cListFn()
                        this.realListFn()
                        this.noticeEntryFlag = false
                        if (this.storeInfo.isEntered === 0) {
                            this.getStoreInfoHttp();
                        }
                        this.isLoading =false;
                    } else {
                        this.$message.error(message)
                        this.isLoading =false;
                    }
                } else {
                    // this.$router.push('/tollMarket')
                    var {href} = this.$router.resolve({path: "/tollMarket"});
                    window.open(href, '_blank')
                }
            },
            handleDeleteCat(index, id) { // 删除已选择的类目
                const [one, two, three] = this.selectArray[index].indexArr;
                let data = this.cList1[one];
                let cat2Arr = data.children.filter(item => item.entered === 1);
                let cat3Arr = data.children[two].children.filter(item => item.entered === 1);
                if (cat3Arr.length === 1) { //三级只有一个，去掉二级的样式
                    if (cat2Arr.length === 1) { //三级，二级只选中一个（去掉一，二，三级的样式）
                        data.entered = 0;
                        data.children[two].entered = 0;
                        data.children[two].children[three].entered = 0;
                    } else { //二级选中很多 (去掉二，三级的样式）
                        data.children[two].entered = 0;
                        data.children[two].children[three].entered = 0;
                    }
                } else {//去掉三级的样式
                    data.children[two].children[three].entered = 0;
                }
                this.$set(this.cList1, one, data);
                this.selectedList.splice(index, 1);
                this.selectArray.splice(index, 1);
            },
            //点击搜索类目结果事件
            // item.cate2_id,index,item
            searchResultClick(current_idx) {
                this.searchCate(this.searArr[current_idx]);
            },
            handleCat1(index) { // 一级类目点击事件
                this.selectCat1 = index;
                this.selectCat2 = 0;
                this.selectCat3 = 0;
                this.clickCate1 = index;
                this.clickCate2 = -1;
                this.clickCate3 = -1;
                this.cList2 = this.cList1[index].children || [];
                this.cList3 = this.cList2.length > 0 ? this.cList2[0].children : [];
            },
            handleCat2(index) {// 二级类目点击事件
                this.selectCat2 = index;
                this.clickCate2 = index;
                this.clickCate3 = -1;
                this.selectCat3 = 0;
                let item = this.cList2[index].children;
                let data = Array.isArray(item) ? item : [];
                this.cList3 = data;
            },
            handleCat3(index) {// 三级类目点击事件
                let item = this.cList1[this.selectCat1], selectFlag = false;
                const cat1 = this.selectCatOld1;
                this.selectCat3 = index;
                this.clickCate3 = index;
                if (item.entered === 0) { //之前没有选中
                    if (cat1 !== this.selectCat1) { //不同类目，清除之前新增的样式
                        let oneItem = this.cList1[cat1], twoItem = [], threeItem = [];
                        for (let i = 0; i < this.fistSelect.length; i++) {
                            if (this.fistSelect[i].indexArr[0] === cat1) {
                                selectFlag = true;
                                break;
                            }
                        }
                        if (!selectFlag) { //一级
                            oneItem.entered = 0;
                            twoItem = oneItem.children || [];
                            for (let i = 0; i < twoItem.length; i++) { //二级
                                if (twoItem[i].entered === 1) {
                                    twoItem[i].entered = 0;
                                }
                                threeItem = twoItem[i].children || [];
                                for (let j = 0; j < threeItem.length; j++) {//三级
                                    if (threeItem[j].entered === 1) {
                                        threeItem[j].entered = 0;
                                    }
                                }
                            }
                            this.$set(this.cList1, cat1, oneItem)
                        } else {
                            twoItem = oneItem.children || [];
                            for (let i = 0; i < twoItem.length; i++) { //二级
                                if (this.selectCatOld2.length > 0) {
                                    for (let j = 0; j < this.selectCatOld2.length; j++) {
                                        let cat3Arr = twoItem[this.selectCatOld2[j]].children.filter(item => item.entered === 1);
                                        if (cat3Arr.length === 1) {
                                            twoItem[this.selectCatOld2[j]].entered = 0;
                                        }
                                    }
                                }
                                threeItem = twoItem[i].children || [];
                                for (let j = 0; j < threeItem.length; j++) {//三级
                                    if (this.selectCatOld3.length > 0) {
                                        for (let k = 0; k < this.selectCatOld3.length; k++) {
                                            threeItem[this.selectCatOld3[k]].entered = 0;
                                        }
                                    }
                                }
                            }
                            this.$set(this.cList1, cat1, oneItem)
                        }
                    }
                    if (item.entered !== 1) {//一级之前是否选中
                        this.selectCatOld1 = this.selectCat1;
                        item.entered = 1;
                    }
                    if (item.children[this.selectCat2].entered !== 1) {//二级之前是否选中
                        this.selectCatOld2 = [this.selectCat2];
                        item.children[this.selectCat2].entered = 1;
                    }
                    if (item.children[this.selectCat2].children[index].entered !== 1) { //三级之前是否选中
                        item.children[this.selectCat2].children[index].entered = 1;
                        this.selectCatOld3 = [this.selectCat3];
                        this.$set(this.cList1, this.selectCat1, item)
                    }
                    this.selectCatOld1 = this.selectCat1;
                } else { //之前选中过的
                    if (cat1 === this.selectCat1) { //同一类目
                        if (item.children[this.selectCat2].entered !== 1) {//二级之前是否选中
                            this.selectCatOld2.push(this.selectCat2);
                            item.children[this.selectCat2].entered = 1;
                        }
                        if (item.children[this.selectCat2].children[index].entered !== 1) { //三级之前是否选中
                            item.children[this.selectCat2].children[index].entered = 1;
                            this.selectCatOld3.push(this.selectCat3);
                            this.$set(this.cList1, this.selectCat1, item)
                        }
                    } else { //不同类目，删掉之前选择的类目的类目
                        let oneItem = this.cList1[cat1], twoItem = [], threeItem = [];
                        oneItem.entered = 0;
                        twoItem = (oneItem && oneItem.children) || [];
                        for (let i = 0; i < twoItem.length; i++) { //二级
                            for (let m = 0; m < this.selectCatOld2.length; m++) {
                                twoItem[this.selectCatOld2[m]].entered = 0;
                            }
                            threeItem = twoItem[i].children || [];
                            for (let k = 0; k < this.selectCatOld3.length; k++) {//三级
                                threeItem[this.selectCatOld3[k]].entered = 0;
                            }
                        }
                        if (item.entered !== 1) {//一级之前是否选中
                            this.selectCatOld1 = this.selectCat1;
                            item.entered = 1;
                        }
                        if (item.children[this.selectCat2].entered !== 1) {//二级之前是否选中
                            this.selectCatOld2 = [this.selectCat2];
                            item.children[this.selectCat2].entered = 1;
                        }
                        if (item.children[this.selectCat2].children[index].entered !== 1) { //三级之前是否选中
                            item.children[this.selectCat2].children[index].entered = 1;
                            this.selectCatOld3 = [this.selectCat3];
                            this.$set(this.cList1, this.selectCat1, item)
                        }
                        this.selectCatOld2 = [this.selectCat2];
                        this.selectCatOld3 = [this.selectCat3];
                        this.$set(this.cList1, cat1, oneItem)
                    }
                    this.selectCatOld1 = this.selectCat1;
                }
                this.selectedList = this.filterSelectItem(this.cList1);
            },
            async realSave() {
                // let arr = this.realList.filter(item => item.selected).map(item => item.id)
                let different = this.findDifferent(this.fieldArrOld, this.fieldArr);
                if (!different) {
                    this.$message.error('领域无变化，请先修改领域')
                    return
                }
                let res = await categorys.editFn({adept_id: this.fieldArr})
                let {code, message, data} = res.data
                if (code == 200) {
                    this.$message.success('操作成功')
                    this.realListFn()
                    if (this.storeInfo.isEntered === 0) {
                        this.getStoreInfoHttp();
                    }
                } else {
                    this.$message.error(message)
                }
            },
            async realListFn() {
                let result = await categorys.listReal()
                let {code, data} = result.data
                if (code == 200) {
                    this.realList = data.realmList;
                    this.fieldArr = data.realmList.filter(item => item.selected === 1).map(item => item.id);
                    this.fieldArrOld = JSON.parse(JSON.stringify(this.fieldArr));
                    this.settledIn = {
                        enteredNum: data.enteredNum,
                        remain: data.remain,
                    }
                    this.realList.forEach((item, i) => {
                        if (item.selected) {
                            this.$set(this.realList[i], 'selected', true)
                        }
                    })
                    this.realListTmp = JSON.parse(JSON.stringify(data))
                }

            },
            async cListFn() {
                let result = await categorys.listCatregory()
                let {code, message, data} = result.data
                if (code == 200) {
                    let newData = this.count === 0 ? this.tagSelectedFun(data) : data;
                    this.selectedList = this.filterSelectItem(newData);
                    let twoIndex = this.clickCate1 >= 0 ? this.clickCate1 : 0,
                        threeIndex = this.clickCate2 >= 0 ? this.clickCate2 : 0;
                    this.cList1 = newData;
                    this.cList2 = newData[twoIndex].children || [];
                    this.cList3 = this.cList2.length ? this.cList2[threeIndex] ? this.cList2[threeIndex].children : [] : [];
                }

            },
            CheckGoNextHandle() { //下一个任务
                if (this.storeInfo.isEntered === 1) {
                    this.$router.push('/store/auth?storeIndex=auth')
                } else {
                    this.$message.error('请完善类目和擅长的领域')
                }
            },
            getStoreInfoHttp() {
                get_store_info().then(res => {
                    let {code, data = {}, message} = res.data
                    // if (code === 200) {}
                    this.CHANGE_STORE_INFO(data);
                }).catch(err => {
                    console.log(err)
                })
            },
            async searchHandle() {
                if (!this.searchVal) {
                    this.$message.error('请输入搜索关键字')
                    return;
                } else if (this.oldSerachVal === this.searchVal) {
                    return;
                }
                let result = await categorys.searchFn({keyword: this.searchVal})
                let {code, message, data} = result.data
                if (code == 200) {
                    this.searArr = data
                    this.oldSerachVal = this.searchVal;
                }
                this.searchShow = true
            },
            saveCategory() {// 点击保存，显示规则和费率弹框
                let different = this.findObjectDifferent(this.fistSelect, this.selectArray);
                if (different.length === 0) {
                    this.$message.error('类目无变化，请先添加类目')
                    return
                } else if (different.length > 50) {
                    this.$message.error('每次添加类目个数不能超过50个')
                    return;
                }
                // cat_one: 5,childrenCat: "{"41":[56],"43":[56,57]}"
                // 计算汇率
                let catOne = 0, childrenCat = {}, item = [], subItem = [], threeItem = [], catId3 = '', rightItem = [];
                for (let i = 0; i < different.length; i++) {
                    const [one, two, three] = different[i].indexArr;
                    item = this.cList1[one];
                    subItem = item.children[two];
                    threeItem = subItem.children[three];
                    catId3 = threeItem.id;
                    rightItem.push({
                        cate_name: threeItem.cate_name,
                        tech_rate: threeItem.tech_rate
                    });
                    if (i === 0) {
                        catOne = item.id;
                        childrenCat[subItem.id] = [catId3]
                        this.leftList = [{
                            cate_name: item.cate_name,
                            min_deposit_enterprise: item.min_deposit_enterprise,
                            min_deposit_personal: item.min_deposit_personal
                        }]
                    } else {
                        for (let key in childrenCat) {
                            if (key == subItem.id) { //二级相同
                                childrenCat[key] = childrenCat[key].concat([catId3])
                            } else { //二级不相同
                                if (childrenCat[subItem.id] === undefined) {
                                    childrenCat[subItem.id] = [catId3]
                                }
                            }
                        }
                    }
                }
                this.noticeParams = {
                    cat_one: catOne,
                    childrenCat: JSON.stringify(childrenCat)
                }
                this.rightList = rightItem;
                this.noticeEntryFlag = !this.noticeEntryFlag
                // 处理阅读，延时可点击
                let handleSee = () => {
                    clearInterval(this.timer)
                    let t = 1000
                    let num = 6
                    this.ruleText = `${num}s后同意上述规则`;
                    this.timer = setInterval(() => {
                        num--
                        if (num <= 0) {
                            num = 0
                            clearInterval(this.timer)
                            this.ruleText = '同意上述规则'
                            this.ruleCtr = false
                        } else {
                            this.ruleText = `${num}s后同意上述规则`
                            this.ruleCtr = true
                        }
                    }, t)
                }
                if (this.oldSelectCate1.length !== this.newSelectCate1.length) {//判断是否新选了一级类目
                    if (this.settledIn.remain < (this.newSelectCate1.length - this.oldSelectCate1.length)) {
                        this.ruleText = '立即扩充类目';
                        this.ruleCtr = false
                        return;
                    } else {
                        handleSee();
                    }
                } else {
                    handleSee()
                }
            },
            searchCate(item3) {
                let item = [], subItem = [], data = this.cList1;
                const {cate1_id, cate2_id, cate3_id} = item3 || {};
                for (let i = 0; i < data.length; i++) { //一级
                    if (data[i].id === cate1_id) {
                        data[i].entered = 1;
                        item = data[i].children || [];
                        for (let j = 0; j < item.length; j++) { //二级
                            if (item[j].id === cate2_id) {
                                item[j].entered = 1;
                                subItem = item[j].children || [];
                                for (let k = 0; k < subItem.length; k++) { //三级
                                    if (subItem[k].id === cate3_id) {
                                        subItem[k].entered = 1; //标记之前保存过
                                        this.$set(this.cList1, i, data[i])
                                    }
                                }
                            }
                        }
                    }

                }
                this.selectedList = this.filterSelectItem(this.cList1);
            },
            tagSelectedFun(data) { //标记之前的保存的类目
                let item = [], subItem = [];
                for (let i = 0; i < data.length; i++) { //一级
                    if (data[i].entered !== 1) {
                        continue;
                    }
                    item = data[i].children || [];
                    for (let j = 0; j < item.length; j++) { //二级
                        if (item[j].entered !== 1) {
                            continue;
                        }
                        subItem = item[j].children || [];
                        for (let k = 0; k < subItem.length; k++) { //三级
                            if (subItem[k].entered === 1) {
                                subItem[k].selected = 1; //标记之前保存过
                            }
                        }
                    }
                }
                return data
            },
            filterSelectItem(data) { //过滤第三级分类，选择了那些项目
                let item = [], subItem = [], threeArr = [], selectArr = [], oneSelectCate1 = [];
                for (let i = 0; i < data.length; i++) { //一级
                    if (data[i].entered !== 1) {
                        continue;
                    }
                    oneSelectCate1.push(data[i].id);
                    item = data[i].children || [];
                    for (let j = 0; j < item.length; j++) { //二级
                        if (item[j].entered !== 1) {
                            continue;
                        }
                        subItem = item[j].children || [];
                        for (let k = 0; k < subItem.length; k++) { //三级
                            if (subItem[k].entered === 1) {
                                threeArr.push(subItem[k]);
                                selectArr.push({id: subItem[k].id, indexArr: [i, j, k]});
                                if (this.clickCate1 < 0) {
                                    this.clickCate1 = i;
                                    this.clickCate2 = j;
                                    this.clickCate3 = k;
                                    this.selectCat1 = i;
                                    this.selectCat2 = j;
                                    this.selectCat3 = k;
                                    // console.log(i, j, k);
                                }
                            }
                        }
                    }
                }
                if (this.count === 0) {
                    this.fistSelect = selectArr;
                    this.oldSelectCate1 = oneSelectCate1;
                    this.count = 1;
                }
                this.selectArray = selectArr;
                this.newSelectCate1 = oneSelectCate1;
                return threeArr;
            }
        }
    }
</script>
<style scoped lang="less">
    @import url('~assets/css/store/skill.less');
</style>

<style scoped lang="less">
    .dialog-box {
        .hint_info {
            font-size: 14px;
            line-height: 14px;
            color: #666;
            margin-bottom: 24px;
        }

        h2 {
            font-size: 20px;
            color: #333333;
            text-align: center;
            padding-bottom: 20px;
        }

        h2 + p {
            font-size: 14px;
            color: #666666;
        }

        .wrap {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;

            .item {
                flex: 1;
            }

            .item:nth-child(1) {
                margin-right: 30px;
            }

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 14px;
                font-size: 16px;
                color: #333;

                a {
                    font-size: 12px;
                    text-decoration-line: none;
                    color: #2967C5;
                }
            }

            .top + div {
                border: 1px solid #CCCCCC;

                .item1 {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 36px;
                    border-bottom: 1px solid #ddd;
                    padding: 0 10px;

                    div {
                        color: #333;

                        span {
                            color: #F3262D;
                        }
                    }

                    .num {
                        color: #212121;
                    }
                }

                .item2 {
                    min-height: 116px;
                    max-height: 116px;
                    position: relative;
                    overflow-y: auto;
                    padding: 0 10px;

                    &.right {
                        padding: 0 20px 0 10px;
                    }

                    .cate_li {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        line-height: 30px;
                        color: #666;
                        font-size: 14px;

                        i {
                            color: #FF0027;
                            font-size: 16px;
                        }
                    }

                    .item_li {
                        display: flex;
                        font-size: 12px;
                        line-height: 30px;

                        .name {
                            flex: 1;
                            color: #333;
                        }

                        .text {
                            color: #666;
                            margin-right: 10px;
                        }

                        .num {
                            color: #F3262D;
                        }
                    }
                }
            }

        }

        .agt {
            min-height: 220px;
            max-height: 220px;
            border: 1px solid #ccc;
            overflow: auto;
            padding: 32px 20px 20px;
            margin-bottom: 56px;

            h3 {
                text-align: center;
                font-size: 18px;
                color: #212121;
                margin-bottom: 16px;
                font-weight: normal;
            }

            h4 {
                line-height: 40px;
            }

            p {
                line-height: 30px;
                color: #666;
            }

            .italic {
                line-height: 30px;
                color: #333;
                font-style: italic;
                text-decoration: underline;
            }
        }

        .tips-text {
            padding: 30px 0 16px;
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            color: #999;
        }
    }

</style>
<style lang="less">
    .search-box {
        .el-input__inner {
            border-color: #F42122;
            height: 36px;
            line-height: 36px;
            border-right-width: 0;
            border-radius: 0;
            font-size: 12px;
            color: #999;
        }

    }

    .service_center {
        .notice_entry {
            .el-dialog__title {
                font-size: 20px;
                font-weight: bold;
            }
        }

        .el-checkbox__label {
            padding-left: 6px;
        }
    }
</style>
