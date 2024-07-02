<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import ng from './nodeView.vue'
import datan from './linShi.json'

const emit = defineEmits(['isopen']);

const is_open = ref(false)
const iii = ref('0px')
const isng = ref(false)
const slekey = ref('')
const nodes = ref()
const edges = ref()

const keys = ref([
    '云南陆军讲武堂',
    '龙云',
    '蔡锷'
])

function aaa(name: any) {
    if (!is_open.value) {
        is_open.value = true
        iii.value = '450px'
    }
    slekey.value = name
    if (slekey.value == "云南陆军讲武堂") {
        nodes.value = datan.云南陆军讲武堂.nodes;
        edges.value = datan.云南陆军讲武堂.edges
    }
    else {
        nodes.value = datan.蔡锷.nodes;
        edges.value = datan.蔡锷.edges
    }
}
function aab() {
    is_open.value = false
    if (!is_open.value) {
        iii.value = '0px'
    }
}
function onTransitionEnd(event: { target: { classList: { contains: (arg0: string) => any; }; }; }) {
    // 判断 event.target 是否为你期望的元素或其中的子元素
    if (event.target.classList.contains('el-aside')) {
        isng.value = !isng.value;
    }
}
function Back(){
    emit("isopen", false)
}
</script>

<template>
    <el-container id="ii">
        <el-main class="ii-aside" @click="aab">
            <el-container>
                <el-header>
                    <el-row style="width: 100%; height: 100%">
                        <el-col :span="8" style="display: flex; justify-content: left; align-items: center">
                            <span></span>
                        </el-col>
                        <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
                            <h2 style="font-family: '宋体';">云南陆军讲武堂</h2>
                        </el-col>
                        <el-col :span="8" style="display: flex; justify-content: right; align-items: center">
                            <el-button type="primary" @click="Back">
                                返回<el-icon class="el-icon--right">
                                    <IEpBack />
                                </el-icon>
                            </el-button>    
                        </el-col>
                    </el-row>
                </el-header>
                <el-scrollbar height="520px">
                    <el-main>
                        <p>&emsp;&emsp;<span class="button-style" @click.stop="aaa(keys[0])">{{ keys[0]
                                }}</span>是中国近代史上一所著名的军事院校，原系清朝为编练新式陆军，加强边防而设的一所军事学校。开办于1909年。与创办于1906年的北洋陆军讲武堂（天津）和创办于1908年的东北讲武堂（奉天）并称三大讲武堂。
                        </p>
                        <p>&emsp;&emsp;1935年，云南陆军讲武堂被改编为“中央陆军军官学校昆明分校”，由<span class="button-style"
                                @click.stop="aaa(keys[1])">{{ keys[1]
                                }}</span>兼主任。抗日战争结束后，1945年9月，第五分校奉令停办。云南陆军讲武堂、讲武学校共办22期，包括校内举办的各种培训队、班，共培养各类军官、军士约9000人。
                        </p>
                        <p>&emsp;&emsp;1908年开始筹办云南陆军讲武堂，校址设在昆明原明朝沐国公练兵处，占地7万余平方米。</p>
                        <p>&emsp;&emsp;学堂开办之初，分步、骑、炮、工四个兵科，设甲、乙、丙三班。课程仿照日本士官学校加以调整而成，分为学科、术科两项。</p>
                        <p>&emsp;&emsp;讲武堂主要招收在职军人和社会青年，分成甲、乙、丙等三班，甲班和乙班学制一年，培训对象是现役军官。丙班是面向社会招收的16到22岁、具有中等文化程度的青年学生，学制三年。
                        </p>
                        <p>&emsp;&emsp;1911年2月，<span class="button-style" @click.stop="aaa(keys[2])">{{ keys[2]
                                }}</span>应到云南新军第十九镇第三十七协任协统，并兼任云南陆军讲武堂教官。</p>
                        <p>&emsp;&emsp;蔡锷
                            1902年10月自费考入东京陆军士官学校第三期。因成绩优异，不久改为官费生。1903年10月，蔡锷自士官学校毕业。在100多名毕业生中，他的成绩名列第三。同时毕业者尚有蒋方震、张孝准，均名列前茅，为人瞩目，时有“中国士官三杰”之称。
                        </p>
                        <p>&emsp;&emsp;辛亥革命后，云南都督蔡锷将军下令将云南陆军讲武堂改为云南陆军讲武学校。以云南讲武堂师生为骨干组建的滇军，在护国、护法战争中战绩辉煌，故学校声誉日隆，威名远扬。邻省甚至邻国许多有志青年纷纷来昆明报考求学。据不完全统计，从第十一期至第十七期，朝鲜、越南来留学的青年达200余名。
                        </p>
                    </el-main>
                </el-scrollbar>
            </el-container>
        </el-main>
        <el-aside id="sec-aside" :width="iii" class="ii-aside" style="margin-left:1px;"
            @transitionend="onTransitionEnd">
            <ng v-if="isng" :nodes="nodes" :edges="edges"></ng>
        </el-aside>
    </el-container>
</template>

<style scoped>
p {
    user-select: none;
    line-height: 1.6;
    margin-top: 5px;
    font-size: larger;
    font-family: '宋体';
}

#ii {
    height: 628px;
    width: 100%;
    margin-left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    background-image: url('../../../public/tuiImage/t3.jpg');
    background-size: cover;
    display: flex;
}

.ii-aside {
    height: 628px;
    background-color: rgba(255, 255, 255, 0.8);
}

#sec-aside {
    transition: width 0.3s ease;
}

.button-style {
    display: inline-block;
    background-color: rgb(0, 0, 0, 0);
    color: rgb(45, 26, 190);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition-duration: 0.4s;
    text-shadow: 0 0 10px rgba(45, 26, 190, 0.8);
    /* 设置文字发光效果 */
}

.button-style:hover {
    background-color: rgb(0, 0, 0, 0);
}
</style>
