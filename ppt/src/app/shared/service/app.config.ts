export const APP_DI_CONFIG: any = {
    // For api calls  
    
    parentDomain : 'http://10.0.0.163:8081/',



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