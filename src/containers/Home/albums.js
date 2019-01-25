import React, { Component } from 'react';
import axios from '../../axios-instance';
import { v4 } from 'uuid';
import Slider from 'react-slick';


class Albums extends Component {

    state = {
        albumList: false,
    };

    constructor(props) {
        super(props);
    }




    componentDidMount() {
        axios.get(`/photos?albumId=${this.props.id}`)
            .then(response => {
                console.log("albumList", response);
                this.setState({ albumList: response.data })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {

        const settings = {
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
        };

        return (
            this.state.albumList && this.state.albumList.length > 0 ?
                <Slider {...settings}>
                    {this.state.albumList.map((item, index) =>

                        <div key={item.title + index}>

                            <img src={item.url} width="140" height="140" alt="" />
                            <h6>{item.title}</h6>
                            <p> <span>albumId:{item.albumId}</span>  <span>Id:{item.id}</span> </p>

                        </div>

                    )}
                </Slider>
                : ''
        )
    }

}

export default Albums;
