import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { selectUser, selectToken } from '../../state/user.selectors'; 
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user$ = this.store.select(selectUser);
  token$ = this.store.select(selectToken);

  constructor(private store: Store){}

  ngOnInit(): void{
    this.user$.subscribe(res => console.log('user***', res))
    this.token$.subscribe(res => console.log('token***', res))
  }

}
