import React, { useEffect, useRef, useState } from "react";
import { BehaviorSubject, Observable, tap } from "rxjs";
import "./App.scss";


const App: Function = (): JSX.Element => {

    const [data, setData] = useState<string>("");
    let randomColor;
    const dataString: BehaviorSubject<string> = new BehaviorSubject<string>("hello cote!");
    const dataString$: Observable<string> = dataString.asObservable();
    const anime = useRef<null | HTMLDivElement>(null);
    const dot = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const sub = dataString$
            .pipe(
                tap((str) => setData(str))
            ).subscribe();
        
        setInterval(() => {
            randomColor = Math.floor(Math.random() * 16777215).toString(16);
            dataString.next(`hello cote!, new color: ${randomColor}`);
            if(anime.current) anime.current.style.webkitTextStrokeColor = `#${randomColor}`;
            if(dot.current) dot.current.style.backgroundColor = `#${randomColor}`;
        }, 2222);
        
        return () => sub.unsubscribe();
    }, []);

    // ...
    return (
        <React.Fragment>
            <div className="page">
                <div ref={anime} className="data">{data}</div>
                <div className="x">
                    <div ref={dot} className="dot y"></div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;
