if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/USER/.gradle/caches/transforms-3/9992745663345bc116bc02ee3d2caa0e/transformed/jetified-hermes-android-0.71.7-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/USER/.gradle/caches/transforms-3/9992745663345bc116bc02ee3d2caa0e/transformed/jetified-hermes-android-0.71.7-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

