import React, { Component } from 'react';
import RecipeSearchForm from './RecipeSearchForm';
import RecipeView from './RecipeView';



export class Recipe extends Component {
    static displayName = Recipe.name;


    constructor(props) {
        super(props);
        this.state = {
            recipeData: [],
            hideRecipes: true
        };
        this.renderRecipeSearchForm = this.renderRecipeSearchForm.bind(this);
    }

    renderRecipeSearchForm() {
        return (
            <RecipeSearchForm onResult={function (data) {
                this.setState({ recipeData: data.recipes, hideRecipes: false });
                console.log("test");
            }.bind(this)} />
        );
    }

    renderRecipeView() {
        return (
            <RecipeView recipeData={this.state.recipeData} hideRecipes={this.state.hideRecipes} />
        );
    }


    render() {
        let RecipeSearchForm = this.renderRecipeSearchForm();
        let showRecipe = this.state.hideRecipes === true ? "" : this.renderRecipeView();
        return (
            <div>
                {RecipeSearchForm}
                {showRecipe}
                <br />
                <br />
                <br />
            </div>
        );
    }
}
