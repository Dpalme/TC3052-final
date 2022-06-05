import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Onboarding } from './onboarding/Onboarding';
import { SignUp } from './onboarding/signup';
import { GamesApp } from './games_app/GamesApp';
import { AuthProvider } from '../providers/authProvider';

export const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/login" element={<Onboarding />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route
                            path="*"
                            element={<GamesApp />}
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}
