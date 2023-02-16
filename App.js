import { addListener } from 'expo-updates';
import { NativeRouter, Route, Routes, Link, Text } from "react-router-native";
import HomeV0 from './components/HomeV0'
import Home from './components/Home'
import Scan from './components/Scan';
import { useState } from 'react';

export default function App() {

    return (
        <NativeRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/card" element={<Scan buttonText={'Carte membre'} />} />
                <Route path="/spot" element={<Scan buttonText={'Code spot'} />} />
                <Route path="/book/:id" element={<Scan buttonText={'Livre'}/>} />
            </Routes>
        </NativeRouter>
    );
}