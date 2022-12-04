import chalk from 'chalk';

function extractLink(arrLinks){
    return arrLinks.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(listURLs){
    const arrStatus = await Promise
    .all(
        listURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            }catch(error){
                return manageError(error);
            }
        })
    )
    return arrStatus;
}

function manageError(error){
    if(error.cause.code === 'ENOTFOUND'){
        return 'Link not found';
    }else{
        return 'Something goes wrong';
    }
}

export default async function checkedlist(listOfLink){
    const links = extractLink(listOfLink);
    const status = await checkStatus(links);
    
    return listOfLink.map((object, index) => ({
        ...object,
        status: status[index]
    }));
}