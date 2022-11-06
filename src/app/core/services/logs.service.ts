import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private logs$: BehaviorSubject<{}[]> = new BehaviorSubject<{}[]>([]);
  public readonly logs: Observable<{}[]> = this.logs$.asObservable();

  passwordPatterns: string[] = ['"param":"password","value":"', '"password":"']

  constructor() { }

  add(log: string): void {
    log = this.filterSensitiveData(log);
    const currentLogs = this.logs$.getValue();
    currentLogs.push(log);
    this.logs$.next(currentLogs);
    console.log(log);
  }

  /**
   * Replaces the user password with ****
   * 
   * Everytime a pattern is found in the log we find the index, 
   * and then we find the index of the next '"'
   * 
   * Between the two indexes, exists the passwordm which we replace
   * with '****'
   * @param log 
   * @returns the log filtered
   */
  filterSensitiveData(log: string){
    for(let passwordPattern of this.passwordPatterns){
      var re = new RegExp(passwordPattern, 'gi');
      while (re.exec(log)) {
        let index1 = re.lastIndex;
        let index2 = log.indexOf('"', index1 + 1);
        log = this.replaceBetween(log, index1, index2, "****")
      }
    }
    return log
  }

  /**
   * Replaces a string between two indexes
   * 
   * @param origin 
   * @param startIndex 
   * @param endIndex 
   * @param insertion 
   * @returns 
   */
  replaceBetween(origin, startIndex, endIndex, insertion) {
    return origin.substring(0, startIndex) + insertion + origin.substring(endIndex);
  }
}
