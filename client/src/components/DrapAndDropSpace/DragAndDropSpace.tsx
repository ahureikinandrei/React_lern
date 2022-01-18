import React, { FC } from 'react'
import {
    Draggable,
    Droppable,
    DragDropContext,
    DropResult,
    DraggingStyle,
    NotDraggingStyle,
} from 'react-beautiful-dnd'
import { WeatherCard } from '../WeatherCard/WeatherCard'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectAuthIsLoading } from '../../store/reducers/settings/selectors'
import { useActions } from '../../hooks/useActions'

const getItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): object => ({
    marginTop: 40,
    ...draggableStyle,
})

const DragAndDropSpace: FC = () => {
    const cards = useTypedSelector(selectAuthIsLoading)
    const { updateCardOrder } = useActions()

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result
        if (!destination) return

        const items = cards.slice()
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)
        updateCardOrder(items)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cards">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.map(({ id }, index) => {
                            return (
                                <Draggable
                                    key={id}
                                    draggableId={id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <WeatherCard id={id} />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DragAndDropSpace