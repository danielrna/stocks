import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Income, IncomeType} from "../domain/model/Income";
import {Observable} from "rxjs";
import {IIncomeRepository} from "./iincome.repository";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class IncomeRespository implements IIncomeRepository {
  constructor(private afs: AngularFirestore) {
  }

  createIncome(income: Income): Promise<string> {
    const incomeRef = this.afs.collection("incomes")
    return incomeRef.add({...income}).then(added => {
      return added.id
    });

  }

  updateIncome(income: Income): Promise<void> {
    return this.afs.collection("incomes").doc(income.id!!)
      .update({...income}).then(a => {
        console.log(income)
      })

  }

  deleteIncome(id: string): Promise<void> {
    return this.afs.collection("incomes").ref.doc(id).delete()

  }


  getIncomesByOwnerId(ownerId: string): Observable<Income[]> {
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('incomes').ref
        .where('ownerId', '==', ownerId).onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                  return this.toDomainIncome(value)
                }
              )
          );
        });
      subscriber.add(() => {
        snapUnsub();
      });
    });

  }

  private toDomainIncome(income: DocumentSnapshot<unknown>): Income {
    return {
      id: income.id,
      type: income.get("type"),
      name: income.get("name"),
      value: income.get("value"),
      userId: income.get("ownerId"),
    } as Income;
  }

  getIncomesById(id: string): Promise<Income> {
    return this.afs.collection('incomes').ref
      .doc(id).get().then(value => {
        return this.toDomainIncome(value)
      })

  }

  getNotSalaryIncomesByOwnerId(id: string): Observable<Income[]> {
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('incomes').ref
        .where('ownerId', '==', id)
        .where('type', '!=', IncomeType.Salaire)
        .onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                  return this.toDomainIncome(value)
                }
              )
          );
        });
      subscriber.add(() => {
        snapUnsub();
      });
    });

  }

  clear(): Observable<Income[]> {
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('incomes').ref
        .where('id', '==', null).onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                  console.log()
                  return this.toDomainIncome(value)
                }
              )
          );
        });
      subscriber.add(() => {
        snapUnsub();
      });
    });

  }

}
