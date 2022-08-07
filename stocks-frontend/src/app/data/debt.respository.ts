import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Debt} from "../domain/model/Debt";
import {Observable} from "rxjs";
import {IDebtRepository} from "./idebt.repository";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DebtRespository implements IDebtRepository {
  constructor(private afs: AngularFirestore) {
  }

  createDebt(debt: Debt): Promise<string> {
    const debtRef = this.afs.collection("debts")
    return debtRef.add({...debt}).then(added => {
      return added.id
    });

  }

  updateDebt(debt: Debt): Promise<void> {
    return this.afs.collection("debts").doc(debt.id!!)
      .update({...debt}).then(a => {
        console.log(debt)
      })

  }

  deleteDebt(id: string): Promise<void> {
    return this.afs.collection("debts").ref.doc(id).delete()

  }


  getDebtsByOwnerId(ownerId: string): Observable<Debt[]> {
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('debts').ref
        .where('ownerId', '==', ownerId).onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                  return this.toDomainDebt(value)
                }
              )
          );
        });
      subscriber.add(() => {
        snapUnsub();
      });
    });

  }

  private toDomainDebt(debt: DocumentSnapshot<unknown>): Debt {
    return {
      id: debt.id,
      type: debt.get("type"),
      name: debt.get("name"),
      value: debt.get("value"),
      ownerId: debt.get("ownerId"),
    } as Debt;
  }

  getDebtsById(id: string): Promise<Debt> {
    return this.afs.collection('debts').ref
      .doc(id).get().then(value => {
        return this.toDomainDebt(value)
      })

  }

  clear(): Observable<Debt[]> {
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('debts').ref
        .where('id', '==', null).onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                  console.log()
                  return this.toDomainDebt(value)
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
