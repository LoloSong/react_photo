import React, {Component} from 'react';
import { connect } from 'react-redux';
import { get_allImages } from './actions/appAction.js';
import './style/style.css';
import ImgFigure from './components/ImgFigure/ImgFigure';
import ControllerUnit from './components/ControllerUnit/ControllerUnit';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            imgsArrangeArr: [
                /*{
                    pos: {
                        left: 0,
                        top: 0
                    }
                },
                rotate: 0,
                isInverse: false
                */
            ],
            isFirst: true,
            isCenter: true
        }

        //初始化位置参数
        this.Constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0,0],
                rightSecX: [0,0],
                y: [0, 0]
            },
            vPosRange: {
                x: [0, 0],
                topY: [0,0]
            }
        }
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(get_allImages());
    }
    componentDidUpdate(){
        if(this.state.isFirst){
            this.pos();
            this.setState({
                isFirst: false
            })
        }

    }

    /*
     * 图片摆放位置
     */
    pos(){

        //获取舞台大小
        let stageDom = this.refs.stage,
            stageW = stageDom.scrollWidth,
            stageH = stageDom.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
        //获取imageFigure大小
        let imgW = 320,
            imgH = 360,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH,
        }
        //计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgW;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        //计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0)
    }

    /*
     * 重新布局所有图片
     * @param centerIndex 指定剧中排布哪个图片
     */
    rearrange(centerIndex){
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        //居中centerIndex的图片
        imgsArrangeCenterArr[0].pos = {
            ...centerPos,
            zIndex: 666,
            isCenter: true

        } ;
        imgsArrangeCenterArr[0].rotate = 0;

        //取出要布局上册的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        //布局位于上侧的图片
        imgsArrangeTopArr.forEach((value,index) => {
            imgsArrangeTopArr[index].pos = {
                top: this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                left: this.getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
                transform: `rotate(${this.get30DegRandom()}deg)`,
                zIndex: 222,
                isCenter: false
            }
        })

        //布局左右两侧的图片
        for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i<j; i++){
            let hPosRangeLORX = null;

            //前半部分布局左边，右边部分布局右边
            if(i < k){
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i].pos = {
                top: this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                left: this.getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1]),
                transform: `rotate(${this.get30DegRandom()}deg)`,
                zIndex: 222,
                isCenter: false
            }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr
        })
    }
    /*
     * 利用rearrange函数,居中对应index的图片
     * @param index,需要被剧中的图片对应的图片信息数组的index值
     * @return { function }
     */
    center(index){
        return () => {
            return this.rearrange(index);
        }
    }

    /*
     * 获取区间内的随机值
     */
    getRangeRandom(low,high){
        return Math.ceil(Math.random() * (high - low) + low);
    }
    /*
     * 获取0到30度之间的任意正负值
     */
    get30DegRandom(){
        return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30)
    }
    /*
     * 翻转图片
     * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
     * return { function } 这是一个闭包函数， 其内return一个真正待被执行的函数
     */
    inverse(index){
        return () => {
            let imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].pos.isInverse = !imgsArrangeArr[index].pos.isInverse
            this.setState({
                imgsArrangeArr
            })
        }
    }

    render() {
        const { appReducer } = this.props;
        //图片数组
        let imgFigures = [];
        let ControllerUnits = [];
        appReducer.forEach((value,index) => {
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0,
                        transform: 'rotate(0deg)',
                        isInverse: false
                    },
                }
            }
            imgFigures.push(
                <ImgFigure
                    data={value}
                    key={index}
                    styleObj={this.state.imgsArrangeArr[index].pos}
                    inverse={this.inverse(index)}
                    center={this.center(index)}
                />
            );
            ControllerUnits.push(
                <ControllerUnit
                    key={index}
                    styleObj={this.state.imgsArrangeArr[index].pos}
                    inverse={this.inverse(index)}
                    center={this.center(index)}
                />
            )
        })

        return(
            <section className="stage" ref="stage">
                <section className="img-sec">
                    { imgFigures }
                </section>
                <nav className="controller-nav">
                    { ControllerUnits }
                </nav>
            </section>
        )
    }
}

export default connect(state => {
    const { appReducer } = state;
    return { appReducer }
})(App);
