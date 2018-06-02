import request from '../utils/request';


export async function ActivityList(params) {
  return await request(`/activity/list`, {
      method: 'GET',
      params: params,
  });
}

export async function ActivityDetail(params) {
  return await request(`/activity/detail`, {
    method: 'GET',
    params: params,
  });
}

export async function ActivityEnroll(params) {
  return await request(`/activity/enroll`, {
    method: 'GET',
    params: params,
  });
}

export async function UserEnroll(params) {
  return await request(`/user/enroll`, {
    method: 'GET',
    params: params,
  });
}

export async function EnrollActivity(params) {
  return await request(`/user/enroll`, {
    method: 'POST',
    params: params,
  });
}

export async function UnEnrollActivity(params) {
  return await request(`/user/enroll`, {
    method: 'DELETE',
    params: params,
  });
}

export async function CollectActivity(params) {
  return await request(`/user/collect`, {
    method: 'POST',
    params: params,
  });
}


export async function UserCollect(params) {
  return await request(`/user/collect`, {
    method: 'GET',
    params: params,
  });
}


export async function UnCollectActivity(params) {
  return await request(`/user/collect`, {
    method: 'DELETE',
    params: params,
  });
}


export async function NewsList(params) {
  return await request(`/news/list`, {
    method: 'GET',
    params: params,
  });
}

export async function Login(params) {
   return await request(`/user/login`, {
     method: 'GET',
     params: params,
   })
}

export async function Register(params) {
  return await request(`/user/register`, {
    method: 'POST',
    params: params,
  })
}

export async function RegisterCheck(params) {
  return await request(`/user/registercheck`, {
    method: 'GET',
    params: params,
  })
}

export async function GetUserInfo(params) {
  return await request(`/user/info`, {
    method: 'GET',
    params: params,
  })
}

export async function SaveUserInfo(params) {
  return await request(`/user/info`, {
    method: 'PUT',
    params: params,
  })
}

