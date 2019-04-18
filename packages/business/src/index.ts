import { ReplaySubject, Observable } from "rxjs";
import { first, reduce } from "rxjs/operators";
import cssVars from "css-vars-ponyfill";

export interface LoggedUserInfo {
    name: string;
    age: number;
}

export class State<T> {
    private state = new ReplaySubject<T>(1);
    public state$: Observable<T> = this.state.asObservable();

    public getState(): Promise<T> {
        return this.state$.pipe<T>(first()).toPromise();
    }

    public setState(newState: T) {
        this.state.next({... newState});
    }
}

export class UserState extends State<LoggedUserInfo> {
    constructor() {
        super();
        this.init();
    }

    init() {
        setTimeout(() => {
            this.setState({
                name: "Pedro",
                age: 26
            });
        }, 1000);
    }

    public async setState(newState: LoggedUserInfo) {
        setTimeout(() => {
            super.setState(newState);
        }, 2000);
    }
}

export interface Theme {
    colorBase: string;
    textSize: string;
}

export class ThemeState extends State<Theme> {
    subscription: any;

    constructor() {
        super();
        this.init();
    }

    init() {
        setTimeout(() => {
            this.setState({
                colorBase: "#ff00ff",
                textSize: "10px"
            });
        }, 1000);
    }

    public setState(newState: Theme) {
        cssVars({variables: {... newState}});
        super.setState(newState);
    }
}