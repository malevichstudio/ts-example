export interface IHint {
    id: number
    puzzleId: number
    puzzle: IPuzzle
    text: string
    order: number
}

export interface IPuzzle {
    id: number
    format: string
    answer: string
    hints: IHint[]
    gameId: number
    name: string
    file: string
    order: number
    puzzleStats: IPuzzleStat[]
    game: IGame
}

export interface IMistake {
    id: number
    puzzleStatId: number
    createdAt: string
    text: string
    puzzleStat: IPuzzleStat
}

export interface IUsedHint {
    id: number
    puzzleStatId: string
    createdAt: string
    puzzleId: number
    puzzleStat: IPuzzleStat
    text: string
}

export interface IPuzzleStat {
    id: number
    teamEventId: number
    puzzleId: number
    puzzle: IPuzzle
    timeUsed: number
    mistakes: [IMistake]
    usedHints: [IUsedHint]
    answeredAt: string,
    passedAt: string,
    teamEvent: ITeamEvent
    availableHintsCount: number
    isPuzzleSolved: boolean
    lastHintUseDateTime: string
}

export interface IMember {
    id: number
    teamId: number
    team: ITeam
    name: string
}

export interface ITeam {
    id: number
    name: string
    description: string
    members: IMember[]
    teamEvents: ITeamEvent[]
}

export interface IGame {
    id: number
    name: string
    descriptionShort: string
    beginningText: string
    finalText: string
    image: string
    topImage: string
    finalImage: string
    bgImage: string
    puzzlesCount: number
}

enum Roles {
    admin,
    coordinator,
}

export interface IUser {
    id: number
    login: string
    email: string
    role: Roles
    urlIdentity: string
    cryptPassword: string
}

export interface IEvent {
    id: number
    name: string
    customer: string
    description: string
    gameId: number
    game: IGame
    isCanceled: boolean
    duration: number
    startDatetime: string
    teamsLimit: number
    userId: number
    coordinator: IUser
    teamEvents: ITeamEvent[]
    rates: IRate[]
}

export interface IRate {
    teamName: string
    solvedPuzzlesCount: number
    passedPuzzlesCount: number
    usedHintsCount: number
    totalTime: number
}

export interface ITeamEvent{
    id: number
    teamId: number
    team: ITeam
    eventId: number
    event: IEvent
    ur: string
    totalTime: number
    score: number
    puzzleStats: IPuzzleStat[]
    currentPuzzleStat: IPuzzleStat
    previousPuzzleStats: IPuzzleStat[]
}

