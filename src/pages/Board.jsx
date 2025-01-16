import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";

export function Board() {
    return (
        <section className="board-container">
            <BoardHeader />
            <BoardDetails />
        </section>
    )
}