import React, { Component } from 'react';
import './ImgFigure.css';

class ImgFigure extends Component {
    handleClick(e){
        if(this.props.styleObj.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let { top, left, transform, zIndex ,isInverse } = this.props.styleObj;
        let styleObj = { top, left, zIndex,transform };
        let imgFigureClassName = 'img-figure';
        imgFigureClassName += isInverse ? ' is-inverse' : '';
        return (
            <figure
                className={imgFigureClassName}
                style={styleObj}
                onClick={(e) => this.handleClick(e)}
            >
                <img src={this.props.data.imgUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={(e) => this.handleClick(e)}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;
