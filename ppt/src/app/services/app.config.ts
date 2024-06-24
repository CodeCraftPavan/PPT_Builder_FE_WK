export const APP_DI_CONFIG: any = {
    // For api calls  
    //https://localhost:44361/search-slide?searchKeyWord=note2
    parentDomain : 'https://localhost:44361/',

   // https://localhost:44361/api/AuthManagement/Sign-In

    endPoints: {
        Authentication:{
            signin:'api/AuthManagement/Sign-In',
            register:'auth.register_user'
        },
        split:{
            splitPPT:'syncFusion-Split',
            addmetadata:'insert-MetaData'
        },
        mergeSlides:{
         getAllSlides:'get-all-slides-object-url',
         searchSlides:'search-slide',
         mergeSlide:'merge-slide'
        }
    


    }

}