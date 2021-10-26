
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
	

  menu: BehaviorSubject<any>

  menuGeneral: any
  constructor(


  ) {    

    this.menu=new BehaviorSubject([
    {
      id:3,
      name:'Dashboard',
      show:false,
      icon:'icon-screen-desktop menu-icon',
      childrens:null,
      route:'/dashboard'      
    },
    {
      id:2,
      name:'Mantenimientos',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:[{
        id:1,
        name:'Dashboard',        
        route:'/mantenimientos'
      },{
        id:2,
        name:'Mantenimientos',        
        route:'/mantenimientos/list'
      }],      
    },{
      id:1,
      name:'Reportes',
      show:false,
      icon:'icon-calendar menu-icon',
      childrens:[{
        id:1,
        name:'Dashboard',        
        route:'/reportes'
      },{
        id:2,
        name:'Reportes',        
        route:'/reportes/list'
      }],   
      
    }/*,{
      id:9,
      name:'Behavior',
      show:false,
      icon:'icon-graph menu-icon',
      childrens:null, 
      route:'/comportamiento'     
    },{
      id:11,
      name:'Devices',
      show:false,
      icon:'icon-grid menu-icon',
      childrens:null,  
      route:'/dispositivos'    
    },{
      id:12,
      name:'Smart Alerts',
      show:false,
      icon:'icon-bell menu-icon',
      childrens:null, 
      route:'/alertas'     
    },{
      id:6,
      name:'Analysis',
      show:false,
      icon:'icon-chart menu-icon',
      childrens:null,   
      route:'/analisis'   
    },{
      id:8,
      name:'Admin Dashboard',
      show:false,
      icon:'icon-layers menu-icon',
      childrens:null,   
      route:'/admin-dashboard'   
    }*/,{
      id:7,
      name:'Sitios',
      show:false,
      icon:'icon-map menu-icon',
      childrens:null,   
      route:'/sitios'   
    },{
      id:10,
      name:'Admin usuarios',
      show:false,
      icon:'icon-people menu-icon',
      childrens:null,   
      route:'/users'   
    }/*,{
      id:13,
      name:'Proveedores',
      show:false,
      icon:'icon-briefcase menu-icon',
      childrens:null,   
      route:'/proveedores'   
    }*/,{
      id: 11,
      name: "Forecast",
      show: false,
      icon: "icon-briefcase menu-icon",
      childrens: null,
      route: "/forecast"
    },{
      id: 12,
      name: "Catálogos",
      show: false,
      icon: "icon-folder menu-icon",
      childrens: null,
      route: "/catalogos"
    },{
      id:5,
      name:'Feedback',
      show:false,
      icon:'icon-support menu-icon',
      childrens:null,   
      route:'/feedback'   
    },
    {
      id:13,
      name:'Refacciones',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:null,   
      route:'/refacciones'   
    },
    {
      id:15,
      name:'Consultas',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:null,   
      route:'/consultas'   
    }
    ,
    {
      id:16,
      name:'Administración',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:null,   
      route:'/administracion'    
    }
  ])

  this.menuGeneral = [
    /*{
      id:3,
      name:'Dashboard',
      show:false,
      icon:'icon-screen-desktop menu-icon',
      childrens:null,
      route:'/dashboard'      
    },*/{
      id:2,
      name:'Mantenimientos',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:[{
        id:1,
        name:'Dashboard',        
        route:'/mantenimientos'
      },{
        id:2,
        name:'Mantenimientos',        
        route:'/mantenimientos/list'
      }],      
    },{
      id:1,
      name:'Reportes',
      show:false,
      icon:'icon-calendar menu-icon',
      childrens:[{
        id:1,
        name:'Dashboard',        
        route:'/reportes'
      },{
        id:2,
        name:'Reportes',        
        route:'/reportes/list'
      }],   
      
    }/*,{
      id:9,
      name:'Behavior',
      show:false,
      icon:'icon-graph menu-icon',
      childrens:null, 
      route:'/comportamiento'     
    },{
      id:11,
      name:'Devices',
      show:false,
      icon:'icon-grid menu-icon',
      childrens:null,  
      route:'/dispositivos'    
    },{
      id:12,
      name:'Smart Alerts',
      show:false,
      icon:'icon-bell menu-icon',
      childrens:null, 
      route:'/alertas'     
    },{
      id:6,
      name:'Analysis',
      show:false,
      icon:'icon-chart menu-icon',
      childrens:null,   
      route:'/analisis'   
    },{
      id:8,
      name:'Admin Dashboard',
      show:false,
      icon:'icon-layers menu-icon',
      childrens:null,   
      route:'/admin-dashboard'   
    }*/,{
      id:7,
      name:'Sitios',
      show:false,
      icon:'icon-map menu-icon',
      childrens:null,   
      route:'/sitios'   
    },{
      id:10,
      name:'Admin Usuarios',
      show:false,
      icon:'icon-people menu-icon',
      childrens:null,   
      route:'/users'   
    }/*,{
      id:13,
      name:'Proveedores',
      show:false,
      icon:'icon-briefcase menu-icon',
      childrens:null,   
      route:'/proveedores'   
    }*/,{
      id: 11,
      name: "Forecast",
      show: false,
      icon: "icon-briefcase menu-icon",
      childrens: null,
      route: "/forecast"
    },{
      id: 12,
      name: "Catalogos",
      show: false,
      icon: "icon-folder menu-icon",
      childrens: null,
      route: "/catalogos"
    },{
      id:5,
      name:'FeedBack',
      show:false,
      icon:'icon-support menu-icon',
      childrens:null,   
      route:'/feedback'   
    },
    {
      id:13,
      name:'Refacciones',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:null,   
      route:'/refacciones'   
    },
    {
      id:15,
      name:'Consultas',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:null,   
      route:'/consultas'   
    }
    ,
    {
      id:16,
      name:'Administración',
      show:false,
      icon:'icon-wrench menu-icon',
      childrens:null,   
      route:'/administracion'   
    }
  ]
  }  

  get menuList(): any | Observable<any>{
    return this.menu.asObservable()
  }

}