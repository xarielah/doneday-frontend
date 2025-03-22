import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { getById, setBoard } from "../store/actions/board.actions";
import { setSelectedTask } from "../store/actions/taskSelect.actions";
import { BoardChart } from "../cmps/board cmps/BoardChart";
import { statusList } from "../services/board/board.service.local";

export const values = statusList;

export function Chart() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getById(boardId, filterBy, sortBy)
            .then(setBoard)
            .catch((err) => {
                navigate('/', { replace: true })
                console.error('Cannot get board', err);
            });

    }, [boards, boardId, filterBy, sortBy])

    useEffect(() => {
        setSelectedTask([])
    }, [board])

    if (!board) return <div>loading...</div>

    if (board)
        return (
            <section className="chart-container">
                <div className="chart-wrapper">
                    <BoardHeader />
                    <BoardChart board={board} />
                </div>
            </section>
        )
}