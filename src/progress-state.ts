﻿/**
 * Представляет собой набор возможных состояний для объекта, выполняющего обращения к каким-либо внешним ресурсам.  
 */
export enum ProgressState {
    /**
     * Никакие запросы еще не выполнялись.  
     */
    Initial = 0,
    /**
     * Последний запрос выполнен успешно.  
     */
    Done = 1,
    /**
     * Последний запрос в процессе выполнения.  
     */
    Progress = 2,
    /**
     * Последний запрос окончился ошибкой.  
     */
    Fail = 3,
    /**
     * Последний запрос был отменен.  
     */
    Cancelled = 4
}
