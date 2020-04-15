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
const coreMacrosList = {
    Calories: "energy",
    Fat: "fat",
    Carbohydrate: "carbs",
    Protein: "protein"
}

export class RecipeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideRecipes: this.props.hideRecipes,
            recipe: this.props.recipeData,
            servicesTotal: 0
        };
    }

    setTagColour(recipe) {
        let recipeTag = recipe.toLowerCase();
        let recipeTagColour = recipeTag.includes("vegan") ? dietryColourList.Vegan
            : recipeTag.includes("vegetarian") ? dietryColourList.Vegetarian
            : recipeTag.includes("nut") ? dietryColourList.Nut
            : recipeTag.includes("fish") ? dietryColourList.Fish
            : "geekblue"

        return recipeTagColour;
    }

    setNutrientValues(nutrient) {
        let nutrientsArr = [];
        Object.keys(nutrient).forEach(item => {
            if (nutrient[item]) {
                let currentNutrientName = nutrient[item].label.toLowerCase();
                if (currentNutrientName === coreMacrosList.Calories || currentNutrientName === coreMacrosList.Carbohydrate || currentNutrientName === coreMacrosList.Fat || currentNutrientName === coreMacrosList.Protein) {
                    nutrientsArr.push(nutrient[item]);
                }
            }
        })
        return nutrientsArr;
    }

    //calculateMacrosPerServing = (macro) => }

    componentDidMount() {

    }

    renderRecipeView(recipe) {
        return (
            <div className="recipe-data">
                <Row>
                    <Col sm={24}>
                        <Table dataSource={recipe.map(element => { return (element) })} rowKey="url" pagination={{ pageSize: 6 }}>
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
                                                <Tag color={this.setTagColour(element)} key="element">{element}</Tag>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )} />
                            <Column title="Marcos (per serving)" dataIndex="totalNutrients" key="totalNutrients" render={nutrient => (
                                <div>
                                    {Array.from([nutrient]).map((n, index) => {
                                        return (
                                            <ul className="list-of-nutrients">
                                                {
                                                    this.setNutrientValues(n).map(element => {
                                                        return (<li key={index++} className="nutrient-element"><p className="marcoText">{element.label + ": " + element.quantity + element.unit}</p></li>);
                                                    })
                                                }
                                            </ul>                                       
                                        );
                                    })}
                                </div>
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

