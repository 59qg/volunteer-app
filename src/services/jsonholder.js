import request from '../utils/request';


export async function getVolunteerActivities(values) {
    return await request(`/society/trend/volunteer/activity/list`, {
        method: 'GET',
        params: values,
    });
}
export async function getVolunteerActivitiesInfo(values) {
    return await request(`/society/trend/volunteer/activity/info`, {
        method: 'GET',
        params: values,
    });
}
export async function getPartyActivities(values) {
    return await request(`/society/trend/party/activity/list`, {
        method: 'GET',
        params: values,
    });
}
export async function getPartyActivitiesInfo(values) {
    return await request(`/society/trend/party/activity/info`, {
        method: 'GET',
        params: values,
    });
}
export async function getSurroudingList(values) {
    return await request(`/servicematter_app/list`, {
        method: 'GET',
        params: values,
    });
}
export async function getMyActivities(params) {
    return await request(`/myactivities?${params[0]}=${params[1]}`);
}
export async function getMyActivitiesStatus(params) {
    return await request(`/myactivities/checkstatus`,{
        method: 'GET',
        params: params
      });
}
export async function postMyActivities(params) {
    return await request(`/myactivities`, {
        method: 'POST',
        params: params
    });
}
export async function putMyActivities(params) {
    return await request(`/myactivities`, {
        method: 'put',
        params: params
    });
}

export async function deleteMyActivities(params) {
    return await request(`/myactivities`, {
        method: 'DELETE',
        params: params
    });
}
export async function getMyPartyActivities(params) {
    return await request(`/mypartyactivities?${params[0]}=${params[1]}`);
}
export async function getMyPartyActivitiesStatus(params) {
    return await request(`/mypartyactivities/checkstatus`,{
        method: 'GET',
        params: params
      });
}
export async function postMyPartyActivities(params) {
  return await request(`/mypartyactivities`, {
    method: 'POST',
    params: params
  });
}
export async function putMyPartyActivities(params) {
  return await request(`/mypartyactivities`, {
    method: 'PUT',
    params: params
  });
}
export async function deleteMyPartyActivities(params) {
  return await request(`/mypartyactivities`, {
    method: 'DELETE',
    params: params
  });
}
export async function getBusinessActivities(values) {
    return await request('/society/trend/business/activity/list', {
        method: 'GET',
        params: values,
    });
}
export async function getCultureActivities(values) {
    return await request('/society/trend/culture/activity/list', {
        method: 'GET',
        params: values,
    });
}
export async function getActivityDetail(values) {
    return await request('/society/trend/culture/activity/' + values.aid, {
        method: 'GET'
    });
}
export async function getOrgs(values) {
    return await request('/organization', {
        method: 'GET',
        params: values,
    });
}
export async function getOrgInfo(values) {
    return await request('/organization/info', {
        method: 'GET',
        params: values,
    });
}
export async function getSuggests(values) {
    return await request('/complait', {
        method: 'GET',
        params: values,
    });
}
export async function getLongban(values) {
    return await request('/longban', {
        method: 'GET',
        params: values,
    });
}
export async function getKarman(values) {
    return await request('/karman', {
        method: 'GET',
        params: values,
    });
}
export async function postMySuggests(params) {
    return await request(`/complait`, {
        method: 'POST',
        params: params
    });
}
export async function getCommunityList(values) {
    return await request('/dics/list', {
        method: 'GET',
        params: values,
    });
}
export async function getCommunitySearch(values) {
    return await request('/dics/search', {
        method: 'GET',
        params: values,
    });
}
export async function getCommitteeDics(values) {
  return await request('/dics/committee', {
    method: 'GET',
    params: values,
  });
}

export async function getNotice(values) {
    return await request('/society/trend/bulletin/list', {
        method: 'GET',
        params: values,
    });
}

export async function getVolunteers(values) {
    return await request('/society/volunteer/list', {
        method: 'GET',
        params: values,
    });
}

export async function getUserCommunity(values) {
    return await request('/appuser/user', {
        method: 'GET',
        params: values,
    });
}
export async function userJoinCommunity(values) {
    return await request('/appuser/user', {
        method: 'POST',
        params: values,
    });
}
export async function getGridman(values) {
    return await request('/gridman/list', {
        method: 'GET',
        params: values,
    });
}
export async function getGridmanService(values) {
  return await request('/gridmanservice', {
    method: 'GET',
    params: values,
  });
}
export async function getSurrouding(values) {
    return await request('/servicetype_app', {
        method: 'GET',
        params: values,
    });
}
export async function getCulturalAreas(values) {
    return await request('/culturalarea/list', {
        method: 'GET',
        params: values,
    });
}
export async function getPopularRecommendation(values) {
    return await request('/popularRecommendation/list', {
      method: 'GET',
      params: values,
    });
}
export async function putSuggest(values) {
    let id = values.id
    delete values.id
    return await request(`/complait/${id}`, {
      method: 'PUT',
      params: values,
    });
}
export async function putMyCollecton(values) {
    return await request('/collection', {
      method: 'PUT',
      params: values,
    });
}
export async function postMyOrder(values) {
  return await request('/matterorder', {
    method: 'POST',
    params: values,
  });
}

export async function getMyCollecton(values) {
    return await request('/collection/list', {
      method: 'GET',
      params: values,
    });
}
export async function getMyOrder(values) {
  return await request('/matterorder/list', {
    method: 'GET',
    params: values,
  });
}

export async function getLeader(values) {
  return await request('/committee/', {
    method: 'GET',
    params: values,
  });
}
export async function getMatterType(values) {
    return await request('/mattertype/getname',{
      method: 'GET',
      params: values,
    })
}

export async function crowdlabel(values) {
    return await request('/crowdlabel', {
      method: 'GET',
      params: values,
  })
}

export async function subjectmatter(values) {
    return await request('/subjectmatter', {
      method: 'GET',
      params: values,
    })
}

export async function mattertype(values) {
    return await request('/mattertype', {
      method: 'GET',
      params: values,
    })
}
//根据关键字查询事项列表
export async function matterdata(values) {
    return await request('/matterdata', {
      method: 'GET',
      params: values,
    })
}
//查询事项详情
export async function matterdataInfo(values) {
    return await request('/matterdata/info', {
      method: 'GET',
      params: values,
    })
}
//查询事项专线列表
export async function getAffairLines(values) {
    return await request('/matterdata/affairLines', {
      method: 'GET',
      params: values,
    })
}
//根据事项专线查询事项列表
export async function getAffairsByLineId(values) {
    return await request('/matterdata/getAffairsByLineId', {
      method: 'GET',
      params: values,
    })
}
//根据用户身份证信息查询办事列表
export async function getMyhandleInfo(values) {
    return await request('/matterdata/getMyhandleInfo', {
      method: 'GET',
      params: values,
    })
}
//记录用户点击的事项记录
export async function postuserpointlist(values) {
    return await request('/matterdata/recordUserList', {
      method: 'POST',
      params: values,
    })
}
//记录用户点击的事项记录
export async function getHotAffairs(values) {
    return await request('/hotaffairs', {
      method: 'GET',
      params: values,
    })
}
export async function servicecomment(values) {
    return await request('/servicematter_app/comment', {
      method: 'GET',
      params: values,
    })
}

export async function addservicecomment(values) {
    return await request('/servicematter_app/comment', {
      method: 'POST',
      params: values,
    })
}

export async function getsurroundingdetail(values) {
    return await request('/culturalarea/infrastructure/' + values.oid, {
      method: 'GET'
    })
}

export async function getservicetypename(values) {
    return await request('/servicetype_app/getname', {
      method: 'GET',
      params: values,
    })
}
//获取小区列表
export async function getHousing_estateLists(values) {
  return await request('/housing_estate', {
    method: 'GET',
    params: values,
  })
}
