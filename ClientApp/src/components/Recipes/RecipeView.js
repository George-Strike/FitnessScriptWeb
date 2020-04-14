import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Table, Tag } from 'antd';
import './RecipeView.scss';

const { Column } = Table;
const dietryColourList = {
    Vegan: "#06BA4A",
    Vegetarian: "green",
    Nut: "#78281F",
    Fish: "blue"
}
export class RecipeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideRecipes: this.props.hideRecipes,
            recipe: this.props.recipeData
        };
    }

    renderRecipeView(recipe) {
        return (
            <div className="recipe-data">
                <Row>
                    <Col sm={24}>
                        <Table dataSource={recipe.map(element => { return (element)})} rowKey="url">
                            <Column title="Image" dataIndex="image" key="image" render={
                                image =>
                                    (<img className="recipe-img" alt={image} src={image} />)}
                            />
                            <Column title="Recipe Name" dataIndex="label" key="label" />
                            <Column title="Recipe URL" dataIndex="url" key="url" />
                            <Column title="Recipe Servings" dataIndex="yield" key="servings" />
                            <Column title="Dietary" dataIndex="healthLabels" key="healthLabels" render={item => (
                                <ul className="list-of-diet-needs">
                                    {item.map((element, index) => {
                                        return (
                                            <li key={index} className="dietry-element">
                                                <Tag color={element.toLowerCase().includes("vegan") ? dietryColourList.Vegan
                                                    : element.toLowerCase().includes("vegetarian") ? dietryColourList.Vegetarian
                                                        : element.toLowerCase().includes("nut") ? dietryColourList.Nut
                                                            : element.toLowerCase().includes("fish") ? dietryColourList.Fish
                                                                : "geekblue"} key="element">{element}</Tag>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )} />

                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        let renderRecipeView = this.renderRecipeView(this.state.recipe);
        return (
            <div>
                {renderRecipeView}
            </div>
        );
    }
}
export default withRouter(RecipeView);

