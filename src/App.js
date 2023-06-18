import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForumPage from "./pages/ForumPage";
import ArticlePage from "./pages/ArticlePage";
import RecipePage from "./pages/RecipePage";
import MealsByName from "./pages/MealsByName";
import { DetailMeal } from "./pages/DetailMeal";
import ProfilePage from "./pages/ProfilePage";
import DetailArticle from "./pages/DetailArticlePage";
import DetailForumPage from "./pages/DetailForumPage";

function App() {
  return (
    <>
      <div className="bg-[#F3FFF4]">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/meals/:name" element={<MealsByName />} />
          <Route path="/meal/:id" element={<DetailMeal />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/article/:id" element={<DetailArticle />} />
          <Route path="/detail-forum/:id" element={<DetailForumPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
