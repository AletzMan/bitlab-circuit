import { BoardFlow } from "@/components/BoardFlow/BoardFlow";
import { Route, Routes } from "react-router";
import { Home } from "./Home/Home";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/board" element={<BoardFlow />} />
		</Routes>
	);
};
