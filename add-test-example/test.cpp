// main.cpp
#include "__test__/add.h"
#include "gtest/gtest.h"
#include "answer.hpp"

namespace
{

    class AddTest : public ::testing::Test
    {
    public:
    protected:
    };

    TEST_F(AddTest, plus_p)
    {
        for (int i = 0; i < 10; i++)
        {
            // FUZZING
            EXPECT_EQ(answer(i, i), add(i, i));
        }
    }

}

int main(int argc, char **argv)
{
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}