import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import './RecipeSearchForm.css';
import { Form, Input, InputNumber, Button } from 'antd';
import { withRouter } from 'react-router';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


export class RecipeSearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeData: {},
            loadSpinner: false,
            signedInUserName: "",
            calories_min: 0,
        }
    }

    onFinish = async (e) => {
        console.log(e.recipeData);
        let recipeData = e.recipeData;
        let signedInUser = await authService.getUser();
        this.setState({ loadSpinner: true, recipeData: recipeData }, () => fetch('api/Recipe/RetrieveData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Ingredients: recipeData.ingredients,
                CaloriesMin: recipeData.calories_min,
                CaloriesMax: recipeData.calories_max
            })
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                console.log(data);
                this.setState({ loadSpinner: false });
                return this.props.onResult(data);
            }.bind(this)));
    }

    render() {
        let loadingSpinner = "";
        if (this.state.loadSpinner) {
            loadingSpinner =
                <div>
                    <div className="loading-spinner">
                        <div className="inner one" />
                        <div className="inner two" />
                        <div className="inner three" />
                    </div>
                    <p className="loading-text"><em>Waiting for recipe data...</em></p>
                </div>;
        }
        return (
            <div>
                <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['recipeData', 'ingredients']}
                        label="Ingredients"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['recipeData', 'calories_min']}
                        label="Calories Min"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0,
                                max: 2000,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['recipeData', 'calories_max']}
                        label="Calories Max"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0,
                                max: 5000,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
                {loadingSpinner}
            </div>
        );
    };
}
export default withRouter(RecipeSearchForm);
