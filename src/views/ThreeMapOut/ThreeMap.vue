<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted, watchEffect } from 'vue'
import * as d3geo from 'd3-geo'
import * as TWEEN from '@tweenjs/tween.js'
import { mapData } from '../../assets/Map_data/MapData_yun'
import { KunMing } from '../../assets/Map_data/kunming'
import { YvXi } from '../../assets/Map_data/yvxi'
import { ChuXiong } from '../../assets/Map_data/chuxiong'
import { ZhaoTong } from '../../assets/Map_data/zhaotong'
import { QvJing } from '../../assets/Map_data/qvjing'
import { HongHe } from '../../assets/Map_data/honghe'
import { WenShan } from '../../assets/Map_data/wenshan'
import { PuEr } from '../../assets/Map_data/puer'
import { XiShuang } from '../../assets/Map_data/xishuangbanna'
import { LinCang } from '../../assets/Map_data/lincang'
import { DaLi } from '../../assets/Map_data/dali'
import { LiJiang } from '../../assets/Map_data/lijiang'
import { DiQing } from '../../assets/Map_data/diqing'
import { NuJiang } from '../../assets/Map_data/nujiang'
import { BaoShan } from '../../assets/Map_data/baoshan'
import { DeHong } from '../../assets/Map_data/dehong'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const container = ref<HTMLElement | null>(null)


// 创建相机
const aspectRatio = 0.6 * window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    70,
    aspectRatio,
    0.02,
    1000
)
camera.position.z = 37 // 将相机位置向后移动，确保立方体在相机视野范围内
camera.position.y = -20
// camera.position.x = -9
camera.rotation.set(0, Math.PI / 4, 0);

// 创建场景
const scene = new THREE.Scene()

// ---------------------------地图数据处理------------------------------------------------------

//设置中心点位置
const position = d3geo.geoMercator().center([101.73, 24.89]).scale(400).translate([0, 0])
function createColor() {
    let color = "#"; // 初始化为一个空字符串
    for (let i = 0; i < 6; i++) {
        color += parseInt(Math.random() * 16).toString(16);
    }
    return color;
}

mapData.features.forEach((value) => {
    if (value.geometry.type === 'MultiPolygon') {
        value.geometry.coordinates.forEach((v) => {
            v.forEach((c) => {
                renderMapChilden(8,c, position, "#d13a34", value.properties)
            })
        })
    }
    if (value.geometry.type === 'Polygon') {
        value.geometry.coordinates.forEach((c) => {
            renderMapChilden(8,c, position, "#d13a34", value.properties)
        })
    }
})

// ---------------------------地图数据处理结束------------------------------------------------------


// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
const width = window.innerWidth * 0.47
const height = window.innerHeight * 0.74
renderer.setSize(width, height)
// renderer.setClearColor("#f2f2f2")
renderer.setClearColor(0x000000, 0)


// ----------------------------------------------鼠标事件----------------------------------------
const raycaster = new THREE.Raycaster();

const pointer = new THREE.Vector2();
let lastIntersects = new Set()
let lastIn: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> = null

function onPointerMove(event: { clientX: number; clientY: number; }) {
    const info = container.value?.querySelector("#info")
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    // 获取渲染器的 DOM 元素的边界框
    const rendererBounds = renderer.domElement.getBoundingClientRect();
    // 计算鼠标在渲染器中的位置
    pointer.x = ((event.clientX - rendererBounds.left) / rendererBounds.width) * 2 - 1;
    pointer.y = -((event.clientY - rendererBounds.top) / rendererBounds.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length) {
        if (intersects[0].object.type === "Mesh") {
            lastIntersects.forEach((value) => {
                if (value != intersects[0].object && value.geometry.parameters.options.depth == 9) {
                    animateModelToHeight(value, 9, 5)
                    // console.log("我执行了")
                }
            })
            if (intersects[0].object.geometry.parameters.options.depth == 5) {
                lastIntersects.add(intersects[0].object)
                lastIn = intersects[0]
                animateModelToHeight(intersects[0].object, 5, 9); // 使用动画逐渐将模型高度升到11
            }
        }
    }
    else {
        lastIntersects.forEach((value) => {
            if (value.geometry.parameters.options.depth == 9)
                animateModelToHeight(value, 9, 5)
        })

    }

}
function onDocumentClick(event: MouseEvent) {
    event.preventDefault();
    const rendererBounds = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rendererBounds.left) / rendererBounds.width) * 2 - 1;
    mouse.y = -((event.clientY - rendererBounds.top) / rendererBounds.height) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const selectedProvince = intersects[0].object.parent;
        const properties = selectedProvince.properties;
        loadSubMap(properties);
    }
}


// ----------------------------------------------鼠标事件结束----------------------------------------

// ----------------------------------------------动画部分--------------------------------------------
// 动画函数
function animation(time: any) {
    renderer.render(scene, camera)
}


function animateModelToHeight(object: unknown, fromHeight: number, targetHeight: number) {
    const tween = new TWEEN.Tween({ height: fromHeight }) // 创建Tween动画，从0开始
        .to({ height: targetHeight }, 800) // 在1秒内将高度从0变化到目标高度
        .easing(TWEEN.Easing.Quadratic.Out) // 使用缓动函数，这里使用了Quadratic.Out，可以根据需要选择其他的缓动函数
        .onUpdate(() => {
            const newHeight = tween._object.height; // 获取当前高度
            adjustModelHeight(object, newHeight); // 调整模型的高度
        })
        .start(); // 启动Tween动画

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update(); // 更新Tween动画
    }
    animate();
}


function adjustModelHeight(object: { geometry: THREE.ExtrudeGeometry; parent: any }, newHeight: number) {
    const oldGeometry = object.geometry;
    const extrudeSettings = {
        steps: 2,
        depth: newHeight, // 使用动画中的新高度值
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };
    const newGeometry = new THREE.ExtrudeGeometry(oldGeometry.parameters.shapes, extrudeSettings);
    object.geometry.dispose(); // 释放旧的几何体资源
    object.geometry = newGeometry; // 应用新的几何体

    // 修改线的高度
    const parent = object.parent; // 获取父对象
    const line = parent.children.find((child: any) => child instanceof THREE.Line); // 在父对象中查找线对象
    if (line) {
        const linePoints = line.geometry.attributes.position.array;
        for (let j = 2; j < linePoints.length; j += 3) {
            linePoints[j] = newHeight + 0.1; // 修改线的高度为新高度加上一个偏移量，确保线在模型上方
        }
        line.geometry.attributes.position.needsUpdate = true; // 更新线的位置
    }
}
// ----------------------------------------------动画部分--------------------------------------------


// 滑动屏幕
const is_yun = ref(true)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);
onMounted(() => {
    if (container.value != null) {
        container.value.appendChild(renderer.domElement)
        renderer.render(scene, camera)
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('click', onDocumentClick);
        console.log("渲染成功")
        // 启动渲染器的动画循环
        renderer.setAnimationLoop(animation)
    } else {
        console.log('容器未正确加载')
    }
})

// ----------------------------------------------utils-----------------------------------------------
function renderMapChilden(set_y: number,data: any[], position: d3geo.GeoProjection, color: string, properties: undefined) {
    const provice = new THREE.Object3D()
    const point: any[] = []
    const linePoints: any[] = []

    data.forEach((value: any[]) => {
        const [x, y] = position(value)
        point.push(new THREE.Vector2(x, -y))
        linePoints.push(new THREE.Vector3(x, -y, 5.1))
    })

    const shape = new THREE.Shape(point);
    const extrudeSettings = {
        steps: 2,
        depth: 5,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // 定义正面材质
    const frontMaterial = new THREE.MeshBasicMaterial({
        color,
        opacity: 0.9,
        transparent: true
    });

    // 定义侧面材质
    const sideMaterial = new THREE.MeshBasicMaterial({
        color: '#FF3333',
        opacity: 0.9,
        transparent: true
    });

    // 将正面材质应用于正面，并将侧面材质应用于侧面
    const materials = [frontMaterial, sideMaterial];
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.material.side = THREE.DoubleSide;
    mesh.position.y = set_y
    provice.add(mesh)

    const linegeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const linematerial = new THREE.LineBasicMaterial({
        color:
            "#ffffff"
    });
    const line = new THREE.Line(linegeometry, linematerial);
    line.position.y = set_y
    provice.add(line)
    provice.properties = properties
    scene.add(provice)
}
function clearCurrentMap() {
    // 移除场景中的所有对象
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}
function renderSubMap(subMapData: any, position: any) {
    subMapData.features.forEach((value: { geometry: { type: string; coordinates: any[] }; properties: string }) => {
        if (value.geometry.type === 'MultiPolygon') {
            value.geometry.coordinates.forEach((v: any[]) => {
                v.forEach((c: any[]) => {
                    renderMapChilden(0,c, position, "#d13a34", value.properties)
                })
            })
        }
        if (value.geometry.type === 'Polygon') {
            value.geometry.coordinates.forEach((c: any[]) => {
                renderMapChilden(0,c, position, "#d13a34", value.properties)
            })
        }
    })
}
function loadSubMap(properties: any) {
    let subMapData;
    if (properties.name === '昆明市') {
        subMapData = KunMing;
    } else if (properties.name === '楚雄彝族自治州') {
        subMapData = ChuXiong;
    } else if (properties.name === '昭通市') {
        subMapData = ZhaoTong;
    } else if (properties.name === '曲靖市') {
        subMapData = QvJing;
    } else if (properties.name === '文山壮族苗族自治州') {
        subMapData = WenShan;
    } else if (properties.name === '红河哈尼族彝族自治州') {
        subMapData = HongHe;
    } else if (properties.name === '玉溪市') {
        subMapData = YvXi;
    } else if (properties.name === '普洱市') {
        subMapData = PuEr;
    } else if (properties.name === '西双版纳傣族自治州') {
        subMapData = XiShuang;
    } else if (properties.name === '临沧市') {
        subMapData = LinCang;
    } else if (properties.name === '大理白族自治州') {
        subMapData = DaLi;
    } else if (properties.name === '丽江市') {
        subMapData = LiJiang as any;
    } else if (properties.name === '保山市') {
        subMapData = BaoShan;
    } else if (properties.name === '德宏傣族景颇族自治州') {
        subMapData = DeHong;
    } else if (properties.name === '怒江傈僳族自治州') {
        subMapData = NuJiang;
    } else if (properties.name === '迪庆藏族自治州') {
        subMapData = DiQing;
    }
    else {
        return
    }
    // 清除当前的地图
    clearCurrentMap();
    is_yun.value = false
    const position = d3geo.geoMercator().center(properties.center).scale(1000).translate([0, 0])
    // 渲染子地图
    renderSubMap(subMapData, position);
}
function backYun() {
    clearCurrentMap()
    mapData.features.forEach((value) => {
        if (value.geometry.type === 'MultiPolygon') {
            value.geometry.coordinates.forEach((v) => {
                v.forEach((c) => {
                    renderMapChilden(8,c, position, "#d13a34", value.properties)
                })
            })
        }
        if (value.geometry.type === 'Polygon') {
            value.geometry.coordinates.forEach((c) => {
                renderMapChilden(8,c, position, "#d13a34", value.properties)
            })
        }
    })
    is_yun.value = true
}

</script>

<template>
    <div ref="container">
        <div id="info"></div>
        <el-button type="primary" style="z-index: 10; position: absolute; 
        top: 25%; left: 67%" v-show="!is_yun"
            @click="backYun">
            退出<el-icon class="el-icon--right">
                <IEpBack />
            </el-icon>
        </el-button>
    </div>
</template>


<style scoped>
#info {
    position: absolute;
    background-color: rgb(0, 0, 0, 0.4);
    color: aliceblue;
    border-radius: 2px;
    display: none;
    left: 0;
    top: 0;
    padding: 5px 10px;
}
</style>
