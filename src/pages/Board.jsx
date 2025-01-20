import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { CrudlBar } from "../cmps/board cmps/CrudlBar";

export function Board() {
    return (
        <section className="board-container">
            <BoardHeader />
            <BoardDetails />
            <CrudlBar />
        </section>
    )
}