 export class UserDTO{
	public userId!:string;
	public name!:string;
	public password!:string;
	
	constructor(userId:string,name:string,password:string) {
		this.userId = userId;
		this.name = name;
		this.password = password;
	}
}